## Project Routes

All steps that are not filled out will be considered stretch and only tackled if we have extra time

## Users
B
Read
E
A
D
** no post to edit/create or delete users

## Food
Browse
Read
E
A
D

## Orders
Browse
Read
Edit
Add
D
*calculate total price through query not through making a total price column

## Order-details
Browse
Read
E
Add
D

## Extra information regarding routes
We will want to store the cart as an in memory object so we are not making a ton of POST requests, once the checkout is ready THEN we will want to send a POST request
This will give us the ability to manipulate the cart as a JS object and send it back to the DB where we will insert the order returning * ID then use it for inserts into the database to have access to the history of the orders

Two statuses for orders: pending or accepted do not overcomplicate it
