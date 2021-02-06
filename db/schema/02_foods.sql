DROP TABLE IF EXISTS foods CASCADE;
CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255),
  description text,
  price int,
  imgURL text
);
