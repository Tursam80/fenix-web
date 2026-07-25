import sql from 'mssql';

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} ortam değişkeni tanımlı değil.`);
  return value;
}

const config: sql.config = {
  server: required('FENIX_DB_SERVER'),
  port: Number(process.env.FENIX_DB_PORT || 1433),
  database: required('FENIX_DB_NAME'),
  user: required('FENIX_DB_USER'),
  password: required('FENIX_DB_PASSWORD'),
  options: {
    encrypt: process.env.FENIX_DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.FENIX_DB_TRUST_CERT !== 'false',
    enableArithAbort: true
  },
  pool: { max: 5, min: 0, idleTimeoutMillis: 30000 },
  connectionTimeout: 15000,
  requestTimeout: 30000
};

declare global {
  // eslint-disable-next-line no-var
  var fenixSqlPool: Promise<sql.ConnectionPool> | undefined;
}

export function getFenixPool() {
  if (!global.fenixSqlPool) {
    global.fenixSqlPool = new sql.ConnectionPool(config).connect();
  }
  return global.fenixSqlPool;
}
