/// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/menu");
const ordersRoutes = require("./routes/orders");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/orders", ordersRoutes(db));

// Note: mount other resources here, using the same pattern above

// COOKIE SESSION \\
app.use(cookieSession({
  name: 'session',
  keys: ['123']
}));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/login/:user_id", (req, res) => {
//   const userID = req.params.user_id;
//   // we have user's id, so all we have to do is set the cookie with it
//   req.session.user_id = userID;
//   // or, in one line:
//   req.session.user_id = req.params.user_id;
//   // then redirect the user somewhere
//   res.redirect('/');
// });

app.get("/login/:user_id", (req, res) => {
  const userID = req.params.user_id;
  // we have user's id, so all we have to do is set the cookie with it
  req.session.user_id = userID;
  res.redirect('/');
});

app.get("/logout", (request, res) => {
  request.session = null;
  res.redirect("/");
});

// So you can make a GET request to http://localhost:8080/login/2 and you'd get a cookie with that user id


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
