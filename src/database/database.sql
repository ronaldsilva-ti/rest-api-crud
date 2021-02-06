CREATE DATABASE restapi;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users(name,email) VALUES 
    ('ronald','ronald@mail.com'),
    ('diogo','diogo@mail.com'),
    ('wallace','wallace@mail.com'),
    ('carolina','carolina@mail.com');

DROP TABLE users; 