DROP TABLE IF EXISTS orders_items CASCADE;
CREATE TABLE orders_items (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity int,
  comments text,
  order_id int REFERENCES orders (id) ON DELETE CASCADE,
  menu_id int REFERENCES menu (id) ON DELETE CASCADE
);
