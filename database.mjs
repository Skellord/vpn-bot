import postgres from 'postgres';

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'admin',
  password: 'qwerty2580456',
};

const sql = postgres(dbConfig);

export default sql;
