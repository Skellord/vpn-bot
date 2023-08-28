import postgres from 'postgres';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID, PGPORT, NODE_ENV } = process.env;

const port = PGPORT ? Number(PGPORT) : 5432;
const url = `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const ssl = NODE_ENV === 'production';

const dbConfig = {
  host: 'localhost',
  port,
  database: 'postgres',
  user: 'admin',
  password: 'qwerty2580456',
};
const connection = NODE_ENV === 'production' ? url : dbConfig;

const sql = postgres(connection, NODE_ENV === 'production' ? { ssl } : undefined);

export default sql;
