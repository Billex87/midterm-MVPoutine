DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_status BOOLEAN DEFAULT FALSE,
  order_begin TIME DEFAULT CURRENT_TIME(2),
  order_end TIMESTAMP,
  owner_id VARCHAR(225),
  total_price INTEGER
);



INSERT INTO orders (user_id, order_status, order_end, owner_id, total_price)
VALUES (1, complete, FALSE)