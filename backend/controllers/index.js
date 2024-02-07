import { pool } from '../db.js';

export const getAllBooks = async (req, res) => {
  const data = await pool.query('SELECT * FROM books');
  res.send(data.rows);
};

export const addNewBook = async (req, res) => {
  try {
    const { name, year, genre, author } = await req.body;
    const text = 'INSERT INTO books VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, year, genre, author];
    const result = await pool.query(text, values);
    res.send(result.rows[0]);
  } catch (e) {
    console.warn(e.message);
  }
};
