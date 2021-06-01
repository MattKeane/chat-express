# Chat Express

A simple chat back end.

## Technologies used

- Express
- Prisma
- Socket.io

## Installation

Install dependencies with yarn:
```
$ yarn install
```
Generate Prisma client and create database:
```
$ npx prisma generate
$ npx prisma migrate dev --name init
```

## API Endpoints

| Route                    | Method | Description       |
| ------------------------ | ------ | ----------------- |
| /api/v1/auth/register    | POST   | Registers a user  |
| /api/v1/auth/login       | POST   | User log in       |
| /api/v1/auth/logout      | GET    | User log out      |
| /api/v1/auth/currentUser | GET    | Gets current user |

## Models

### User
| Field    | Type    | Description     |
| -------- | ------- | --------------- |
| id       | Integer | id              |
| username | String  | username        |
| email    | String  | user's email    |
| password | String  | hashed password |