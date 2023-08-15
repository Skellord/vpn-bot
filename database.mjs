import postgres from 'postgres';
import { HOST } from './const.mjs';

const port = process.env.DB_PORT ?? 5432;
const database = process.env.PGDATABASE ?? 'postgres';
const user = process.env.PGUSER ?? 'admin';
const password = process.env.PGPASSWORD ?? 'qwerty2580456';

const dbConfig = {
  host: HOST,
  port,
  database,
  user,
  password,
};

const sql = postgres(dbConfig);

export default sql;
