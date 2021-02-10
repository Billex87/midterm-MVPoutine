DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  menu_id INTEGER REFERENCES menu(id) ON DELETE CASCADE,
  orders_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER,
  comments text
);

