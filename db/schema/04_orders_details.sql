DROP TABLE IF EXISTS orders_details CASCADE;
CREATE TABLE orders_details (
  id SERIAL PRIMARY KEY NOT NULL,
  quantity int,
  comments text,
  order_id int REFERENCES orders (id) ON DELETE CASCADE,
  food_id int REFERENCES foods (id) ON DELETE CASCADE
);
