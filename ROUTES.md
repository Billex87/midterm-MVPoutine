## Project Routes

All steps that are not filled out will be considered stretch and only tackled if we have extra time

## Users
B
Read GET/login/:user_id
E
A
D
** no post to edit/create or delete users

## Menu
Browse GET/menu
Read GET/menu/:menu_id
E 
A
D

## Orders
Browse GET/orders
Read   GET/orders/:orders_id
Edit   POST/orders/:orders_id (2) (edit your cart)
Add    POST/orders (1) (submit order)
D
*calculate total price through query not through making a total price column

## Order-items
Browse GET/order-items 
Read   
E
Add   POST/order-details (add order items to your order) (the first post creates the order) check if order already created or not
D

## Extra information regarding routes
We will want to store the cart as an in memory object so we are not making a ton of POST requests, once the checkout is ready THEN we will want to send a POST request
This will give us the ability to manipulate the cart as a JS object and send it back to the DB where we will insert the order returning * ID then use it for inserts into the database to have access to the history of the orders

Two statuses for orders: pending or accepted do not overcomplicate it
