const express = require('express');
const router = express.Router();
const twilio = require('../api/twilio');

const getTotalPrice = (cartArr) => {
  let totalPrice = 0;
  for (let item of cartArr) {
    totalPrice += Number(item.price) * Number(item.quantity);
  }
  // console.log('totalPriceInside', totalPrice)
  return totalPrice;
};

//order end** -30 min timer - order_end
module.exports = (db) => {
  router.post("/", (req, res) => {
    // let totalPrice = document.getElementByID
    // console.log('req.body', req.body);
    // console.log('reqbodycart', req.body.cart)
    //calculate totalprice here
    const totalPrice = getTotalPrice(req.body.cart)
    // console.log('totalPrice after', totalPrice)
    db.query(`INSERT INTO orders (user_id, order_status, owner_id, total_price)
    VALUES (1, true, 1, ${totalPrice})
    RETURNING *;`)
      .then(data => {
        let cartItems = req.body.cart;
        console.log('data.rows', data.rows); //to check orders_id
        for (let item of cartItems) {
          // totalPrice += item.price;
          let paramsArray = [Number(item.id), data.rows[0].id, Number(item.quantity)];
          console.log('paramsArray', paramsArray);
          db.query(`INSERT INTO order_items (menu_id, orders_id, quantity)
          VALUES ( $1, $2, $3);`, paramsArray)
            .catch(err => console.log(err));
        }

        const orders = data.rows;
        twilio.smsOrderIn(data.rows[0].id, data.rows[0].total_price);
        twilio.smsRestaurant(data.rows[0].id)
        res.redirect("/")
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/", (req, res) => {
    db.query(`SELECT *
    FROM orders
    JOIN order_items ON orders.id =  orders_id
    JOIN menu ON menu.id = menu_id
    WHERE user_id = 1
    ORDER BY orders.id DESC
    ;`)
      .then(data => {
        const orders = data.rows;
        let parsedData = {};
        for (let item of orders) {
          if (!parsedData[item.orders_id]) {
            parsedData[item.orders_id] = []
          }
          parsedData[item.orders_id].push(item)
        }
        // console.log('data.rows', data.rows)
        // const orderedData = Object.keys(parsedData).sort().reverse().reduce(
        //   (obj, key) => {
        //     obj[key] = parsedData[key];
        //     return obj;
        //   },
        //   {}
        // );
        const orderedData = Object.keys(parsedData).sort(function(a, b) {
          return Number(a) - Number(b);
        }).reverse().map((orderID) => {
            const menuItems = parsedData[orderID]
            return {orderID , menuItems, totalPrice: getTotalPrice(menuItems) }
        }
        )
            // const totalPrice = menuItems.reduce((acc, menuItem) => {
            //  return acc + (menuItem.quantity * menuItem.price)
            // }, 0)


        // console.log('orderedData', orderedData)
        console.log(orderedData)
        console.log(parsedData)
        // console.log('look for what I need', data.rows)
        // res.json({ orders });  // this line will crash the page- lets delete it
        // console.log('data.rows', data.rows)
        // res.render('orders', {orders: data.rows})
        res.render('orders', {orders: orderedData});
        // console.log(orders)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get("/complete", (req, res) => {
    db.query(`SELECT *
    FROM orders
    JOIN order_items ON orders.id =  orders_id
    JOIN menu ON menu.id = menu_id
    WHERE user_id = 1
    ORDER BY orders.id DESC
    ;`)
      .then(data => {
        const orders = data.rows;
        let parsedData = {};
        for (let item of orders) {
          if (!parsedData[item.orders_id]) {
            parsedData[item.orders_id] = []
          }
          parsedData[item.orders_id].push(item)
        }
        const orderedData = Object.keys(parsedData).sort(function(a, b) {
          return Number(a) - Number(b);
        }).reverse().map((orderID) => {
            const menuItems = parsedData[orderID]
            return {orderID , menuItems, totalPrice: getTotalPrice(menuItems) }
        }
        )
        res.render('restaurant', {orders: orderedData});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post("/complete", (req, res) => {
    // console.log("COMPLETE ROUTE");
    twilio.smsReady()
  })
  router.post("/:id", (req, res) => {
    console.log(req.params.id);
  })
  return router;
};
