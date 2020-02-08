// dependencies
const express = require("express");
const exphbs = require("express-handlebars");

// port for use in heroku app
const PORT = process.env.PORT || 8080;

// create instance of express app
const app = express();

// access static app content from public directory
app.use(express.static("public"));

// access application data as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set app to use handlebars engine with main.handlebars as default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// access server routes
const routes = require("./controllers/logger_controller");

// use server routes
app.use(routes);

// start server with client listener
app.listen(PORT, function() {
  // console.log successful listen
  console.log("Now listening on http://localhost:" + PORT);
});