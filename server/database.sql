CREATE DATABASE TODO_APP;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    title VARCHAR (255),
    created_date DATE,
    -- created_date VARCHAR(255),
    description VARCHAR(255),
    priority VARCHAR(255),
    todo_state VARCHAR(255)
);