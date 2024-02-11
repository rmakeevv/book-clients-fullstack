import pkg from 'pg';
import dotenv from 'dotenv';
const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: 'postgres',
  password: 'dbpass',
});
