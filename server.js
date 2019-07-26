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
mongoose.connect("mongodb://localhost/hw_scraper", { useNewUrlParser: true });


app.get("/", function(req,res){
    res.send("Hello World");
});

app.get("/saved", function(req, res){
    res.send("Saved Articles Page");
})
//function to scrape NYT and get title, URL and description
//route to list all scraped headlines
app.get("/scrape", function(req, res){
    axios.get("https://editorial.rottentomatoes.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("a.articleLink").each(function(i, element){
            //Make a new object for each result from the articleLinks
            var result = {};

            result.title = $(element).find("p.title").text().trim();
            result.date = $(element).find("p.publication-date").text().trim();
            result.link = $(element).attr("href").trim();
            result.image = $(element).find(".editorialColumnPic").find("img").attr("src").trim();
            // console.log(result);

            //Add each result to the database
            db.Article.create(result).then(function(dbArticle) {
                // console.log(dbArticle);
            }).catch(function(err){
                console.log(err);
            });

            // console.log("=====================================");
            // console.log(title);
            // console.log(date);
            // console.log(link);
            // console.log(image);
            // console.log("=====================================");
        });
    });
    res.send("Scrape Complete");
});

//Route to display all articles from the DB
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

//route to  delete a note
app.delete("/clear", function(req, res){ 
    db.Article.remove({}, function(err) { 
        console.log('collection removed'); 
     });
});

//route to save an article
//route to list all saved articles
//route to save a note on a saved article
//route to edit a note
//route to unsave a note


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });