import { NextResponse } from 'next/server';
import { getFenixPool } from '@/lib/fenix-db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type QueryRow = Record<string, unknown>;

export async function GET() {
  try {
    const pool = await getFenixPool();
    const result = await pool.request().query(`
      SELECT
        @@SERVERNAME AS server_name,
        DB_NAME() AS database_name,
        CAST(SERVERPROPERTY('ProductVersion') AS nvarchar(100)) AS product_version,
        CAST(SERVERPROPERTY('Edition') AS nvarchar(200)) AS edition;

      SELECT TOP (300)
        TABLE_SCHEMA AS table_schema,
        TABLE_NAME AS table_name
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_SCHEMA, TABLE_NAME;
    `);

    const recordsets = result.recordsets as unknown as QueryRow[][];
    const connectionRows = recordsets[0] ?? [];
    const tables = recordsets[1] ?? [];

    return NextResponse.json({
      ok: true,
      connection: connectionRows[0] ?? null,
      tables,
      tableCount: tables.length
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Bilinmeyen bağlantı hatası';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
