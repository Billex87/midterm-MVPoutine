DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
  order_status BOOLEAN DEFAULT FALSE,
  order_begin TIME DEFAULT CURRENT_TIME(2),
  order_end TIMESTAMP,
  owner_id VARCHAR(225),
  item_name VARCHAR(255),
  item_price INTEGER,
  item_quantity INTEGER
);
