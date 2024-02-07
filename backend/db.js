import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'book_clients',
  user: 'postgres',
  password: 'dbpass',
});
