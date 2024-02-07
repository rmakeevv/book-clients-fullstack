import express from 'express';
import {
  addNewBook,
  deleteOneBook,
  editOneBook,
  getAllBooks,
} from './controllers/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/book', addNewBook);
app.delete('/book/:id', deleteOneBook);
app.put('/book/:id', editOneBook);

app.get('/books', getAllBooks);

try {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} catch (e) {
  console.log(e);
}
