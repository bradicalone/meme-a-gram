CREATE DATABASE pernmeme;

-- Schema
CREATE TABLE meme (
    meme_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    src TEXT,
    users_id BIGINT REFERENCES users (id)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(200) NOT NULL
);