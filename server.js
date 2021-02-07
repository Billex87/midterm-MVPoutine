// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const cookieSession = require('cookie-session')
const twilio = require('./server/twilio.js')
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// COOKIE SESSION \\
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");
const orderItemsRoutes = require("./routes/order_items");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/orders", ordersRoutes(db));
app.use("/api/order_items", orderItemsRoutes(db))
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/login/:user_id", (req, res) => {
//   req.session.user_id = req.params.user_id;
//   const userID = req.session.user_id
//   res.redirect("/");
//   db.query(`SELECT id FROM users WHERE users.id = '${userID}';`)

//   })

  app.get("/login/:user_id", (req, res) => {
    console.log("working")
    const userID = req.params.user_id
    console.log('userID', userID)
   db.query(`SELECT id FROM users WHERE users.id = '${userID}';`)
      .then((res) => {
        const userID = res.rows[0].user_id;
        req.session.user = userID; // set unique cookie for each user using
      })
      .catch((error) => {
              res.redirect(`/`);
            })
          



  // app.post("/login", (request, response) => {
  //   const userName = request.body.user;
  //   const queryConfig = {
  //     text: `
  //       SELECT id AS user_id FROM users WHERE name = $1
  //     `,
  //     values: [userName]
  //   }
  //   db.query(queryConfig)
  //     .then((queryResponse) => {
  //       const userId = queryResponse.rows[0].user_id;
  //       request.session.user = userId; // set unique cookie for each user using
  //       // their id so that two users with the same name don't get the same cookie
  //       if (Number(userId) !== 4) {
  //         response.redirect(`/`)
  //       } else {
  //         response.redirect(`/restaurants`)
  //       }
  //     })
  //     .catch((error) => {
  //       response.redirect(`/`);
  //     })

  // });



app.post("/logout", (request, res) => {
  request.session = null;
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});






//example of how to login with cookies in tiny
// app.get('/login', (req, res) => {
//   const userID = req.session.userID;
//   const user = users[userID];
//   if (user) {
//     return res.redirect('/urls');
//   }
//   const templateVars = {
//     user: null
//   };
//   res.render('login', templateVars);
// });
