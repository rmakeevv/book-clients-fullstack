CREATE TABLE books(
name VARCHAR(150),
year int,
genre VARCHAR(150),
author VARCHAR(150),
id SERIAL PRIMARY KEY,
instock int);

INSERT INTO "books" ("name", "year", "genre", "author", "id", "instock") VALUES
('My book',	2004,	'genre',	'author',	1,	5);