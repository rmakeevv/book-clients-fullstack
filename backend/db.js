import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'book_clients',
  user: 'postgres',
  password: 'dbpass',
});

/*const text =
  'INSERT INTO books(id, name, year, genre, author) VALUES ($1, $2, $3, $4, $5) RETURNING *';
const values = [366, 'book_test', 1222, 'genre_test', 'author_test'];

const res = await pool.query(text, values);
console.log(res);*/

const text = 'INSERT INTO section(name) VALUES ($1) RETURNING *';
const values = ['test'];

const res = await pool.query(text, values);
console.log(res);

/*
const text = 'SELECT * FROM books';

const res = await pool.query(text);
console.log(res.rows);
*/
