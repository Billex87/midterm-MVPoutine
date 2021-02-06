DROP TABLE IF EXISTS menu CASCADE;
CREATE TABLE menu (
  id SERIAL PRIMARY KEY NOT NULL,
  name varchar(255),
  description text,
  price int,
  imgURL text
);
