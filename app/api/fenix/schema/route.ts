import { NextResponse } from 'next/server';
import { getFenixPool } from '@/lib/fenix-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const targetTables = ['usr', 'UsrYetki', 'UsrPrg', 'UsrKonum', 'frm', 'stk', 'car', 'fat', 'fatAyr'];

export async function GET() {
  try {
    const pool = await getFenixPool();
    const request = pool.request();
    const parameters = targetTables.map((table, index) => {
      request.input(`table${index}`, table);
      return `@table${index}`;
    });

    const result = await request.query(`
      SELECT
        TABLE_NAME AS table_name,
        ORDINAL_POSITION AS ordinal_position,
        COLUMN_NAME AS column_name,
        DATA_TYPE AS data_type,
        CHARACTER_MAXIMUM_LENGTH AS max_length,
        IS_NULLABLE AS is_nullable
      FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = 'dbo'
        AND TABLE_NAME IN (${parameters.join(', ')})
      ORDER BY TABLE_NAME, ORDINAL_POSITION;
    `);

    return NextResponse.json({
      ok: true,
      tables: targetTables,
      columns: result.recordset
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Şema bilgisi alınamadı.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
