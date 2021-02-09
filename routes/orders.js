const express = require('express');
const router  = express.Router();
const twilio = require('../api/twilio')

module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(`INSERT INTO orders (user_id, order_status, owner_id, total_price)
    VALUES (1, true, 1, 4869)
    RETURNING *;`)
      .then(data => {
        console.log('hit route') //why isnt this showing?
        const orders = data.rows;
        twilio.smsOrderIn(orders,'+17782146187');
        // res.json({ orders });  // this line will crash the page- lets delete it
        res.render('orders', {orders});
        // console.log(orders)
      })
      .catch(err => {
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
  return router;
};
