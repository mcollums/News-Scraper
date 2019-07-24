var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

//Getting Web Scraper 
var axios = require("axios");
var cheerio = require("cheerio");

//Requiring models
var db = require("./models");

var PORT = 3001;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });


app.get("/", function(req,res){
    res.send("Hello World");
})
//function to scrape NYT and get title, URL and description
//route to list all scraped headlines
app.get("/scrape", function(req, res){
    axios.get("https://editorial.rottentomatoes.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        var results = [];
        $("a.articleLink").each(function(i, element){
            console.log(element);
        });
    });
    res.send("Scrape Complete");
});
//route to save an article
//route to list all saved articles
//route to save a note on a saved article
//route to edit a note
//route to  delete a note
//route to unsave a note

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });