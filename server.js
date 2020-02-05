
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");



var PORT = process.env.PORT || 8080;

// initialize express
var app = express();

var routes = require("./routes");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// make public a static folder
app.use(express.static("public"));

// handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//requests go through routes 
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hw_scraper";

mongoose.connect(MONGODB_URI, {
    'useFindAndModify': false,
    'useNewUrlParser': true,
    'useUnifiedTopology' : true,
    'useCreateIndex': true
});
 
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});