CREATE DATABASE notes_server;

USE notes_server;

CREATE TABLE notes(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(250) NOT NULL,
    text VARCHAR(250) NOT NULL
);

SELECT * FROM notes;