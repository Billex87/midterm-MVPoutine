const express = require('express');
const router = express.Router();


//this current has incorrect data
module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM order_items`;
    // console.log(query);
    db.query(query)
      .then(data => {
        const menu = data.rows;
        res.json({ menu });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
