# Запуск приложения #
## 1. PostrgreSQL ##

Создайте пользователя с паролем:
```
CREATE USER postgres WITH PASSWORD dbpass;
```
Создайте БД:
```
CREATE DATABASE book_clients OWNER postgres;
```
Создайте таблицу:
```
CREATE TABLE books(
name VARCHAR(150),
year int,
genre VARCHAR(150),
author VARCHAR(150),
id SERIAL PRIMARY KEY,
instock int);
```
Затем импортируйте данные.
CSV-файл таблицы лежит в корне проекта.

## 2. Backend
Backend использует .env переменные, которые указаны в файле:
```
PORT = 5000
JWT_SECRET_KEY = gfg_jwt_secret_key
TOKEN_HEADER_KEY = gfg_token_header_key
DB_HOST = localhost
DB_PORT = 5432
DB_NAME = book_clients
```

Установка и запуск:
```
cd backend
npm i
npm start
```

## 3. Frontend ##
Пароль и логин от личного кабинета:
Login: admin,
Password: 1234

Установка и запуск:
```
cd frontend
npm i
npm start
```
Frontend не использует .env. Работает на 3000 порту и обращается в Backend на localhost:5000.



