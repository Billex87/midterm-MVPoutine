const express = require('express');
const router  = express.Router();
const twilio = require('../api/twilio')

 //order end** -30 min timer - order_end
module.exports = (db) => {
  router.post("/", (req, res) => {
    // let totalPrice = document.getElementByID
    let totalPrice = 0;
    console.log('req.body', req.body)
    // const cartItems = req.body
    db.query(`INSERT INTO orders (user_id, order_status, owner_id)
    VALUES (1, true, 1)
    RETURNING *;`)
      .then(data => {
        console.log('typeof req.body', typeof req.body)
        let cartItems = req.body.cart
        console.log(data.rows[0]) //to check orders_id
        for (let item of cartItems) {
          totalPrice += item.price
          db.query(`INSERT INTO order_items (menu_id, orders_id, quantity, comments)
          VALUES ("${item.name}", ${data.rows[0].orders_id}, ${item.quantity});`)
          .catch(err => console.log(err))
        }
        console.log('hit route')
        const orders = data.rows;
        twilio.smsOrderIn(orders,'+17782146187')
        res.render('orders', {orders});
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/", (req, res) => {
    // const ownerId = req.session.userID
    const ownerID = 1
    // console.log(ownerId)
    db.query(`SELECT * FROM orders WHERE owner_id = '${ownerID}';`)
      .then(data => {
        // console.log(data)
        const orders = data.rows;
        // res.json({ orders });  // this line will crash the page- lets delete it
        res.render('orders', {orders}); //added by idil to make orders page
        // console.log(orders)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/:id", (req, res) => {
    console.log(req.params.id);
  })
  router.post("/complete", (req, res) => {
    console.log("LOOK");
    twilio.smsReady()
    res.redirect('/')
  })
  return router;
};
