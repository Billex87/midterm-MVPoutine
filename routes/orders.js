const express = require('express');
const router = express.Router();
const twilio = require('../api/twilio');

//order end** -30 min timer - order_end
module.exports = (db) => {
  router.post("/", (req, res) => {
    // let totalPrice = document.getElementByID
    let totalPrice = 0;
    console.log('req.body', req.body);
    console.log('reqbodycart', req.body.cart)
    //calculate totalprice here
    const getTotalPrice = (cartArr) => {
      totalPrice = 0;
      for (let item of cartArr) {
        totalPrice += Number(item.price) * Number(item.quantity);
      }
      console.log('totalPriceInside', totalPrice)
      return totalPrice;
    };
    console.log(getTotalPrice(req.body.cart))
    console.log('totalPrice after', totalPrice)
    db.query(`INSERT INTO orders (user_id, order_status, owner_id, total_price)
    VALUES (1, true, 1, ${totalPrice})
    RETURNING *;`)
      .then(data => {
        // console.log('typeof req.body', typeof req.body)
        let cartItems = req.body.cart;
        console.log('data.rows', data.rows); //to check orders_id
        for (let item of cartItems) {
          totalPrice += item.price;
          let paramsArray = [Number(item.id), data.rows[0].id, Number(item.quantity)];
          console.log('paramsArray', paramsArray);
          db.query(`INSERT INTO order_items (menu_id, orders_id, quantity)
          VALUES ( $1, $2, $3);`, paramsArray)
            .catch(err => console.log(err));
        }

        const orders = data.rows;
        twilio.smsOrderIn(data.rows[0].id, data.rows[0].total_price);
        twilio.smsRestaurant(data.rows[0].id)
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
    // console.log(ownerId)
    db.query(`SELECT * FROM orders WHERE user_id = 1;`)
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
  router.post("/complete", (req, res) => {
    console.log("COMPLETE ROUTE");
    twilio.smsReady()
    res.redirect('/')
  })
  router.post("/:id", (req, res) => {
    console.log(req.params.id);
  })
  return router;
};

