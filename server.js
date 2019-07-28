// START SERVER REQUIREMENTS
//===========================================================
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");
var chalk = require("chalk");


var PORT = process.env.PORT || 3001;

// require models
var db = require("./models");

// initialize express
var app = express();

// middleware
// parse body as json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// make public a static folder
app.use(express.static("public"));

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// connect to mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/hw_scraper";
mongoose.connect(MONGODB_URI);
var dbMon = mongoose.connection;

dbMon.on("error", function (error) {
    console.log("Mongoose error: ", error);
});

dbMon.once("open", function () {
    console.log("Mongoose connection successful.");
});


// START API CALLS
//===========================================================
// =============IEW CALLS============
app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            console.log()
            // If we were able to successfully find Articles, send them back to the client
            hbsObject = {
                article: dbArticle
            }
            res.render("index", hbsObject);

        }).catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

// Database Calls================
//function to scrape Rotten Tomatoes and get title, URL and description
// //route to list all scraped headlines
app.get("/scrape", function (req, res) {
    axios.get("https://editorial.rottentomatoes.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("a.articleLink").each(function (i, element) {
            //Make a new object for each result from the articleLinks
            var result = {};

            result.title = $(element).find("p.title").text().trim();
            result.date = $(element).find("p.publication-date").text().trim();
            result.link = $(element).attr("href").trim();
            result.image = $(element).find(".editorialColumnPic").find("img").attr("src").trim();
            // console.log(chalk.green(result));

            // db.Article.find({ title:result.title }).then(function (dbArticle) {
            //     // if(dbArticle)
            //     // console.log(chalk.blue(dbArticle));
            //     // dbArticle.forEach(function (obj) {
            //     //     if (obj.title != result.title) {
            //     //         //Add each result to the database
            //     //         db.Article.create(result).then(function (newArticle) {
            //     //             console.log(chalk.red(newArticle));
            //     //         }).catch(function (err) {
            //     //             console.log(err);
            //     //         });
            //     //     }
            //     // })
            // })

            //Add each result to the database
            db.Article.create(result).then(function (dbArticle) {
                // console.log(dbArticle);
            }).catch(function (err) {
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
app.get("/articles/all", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});


//route to  delete a note
app.delete("/clear/all", function (req, res) {
    db.Article.remove({}, function (err) {
        console.log('collection removed');
    });
});

//route to save an article
app.put("/favorite/:id", function (req, res) {
    console.log(chalk.green(req.params.id + " BEING UPDATED"));
    db.Article.findOneAndUpdate({ _id: req.params.id }, { favorite: true }, { new: true })
    .catch(function (err) {
        res.json(err);
    });
    res.status(200);
});

//route to list all saved articles
//route to save a note on a saved article
//route to edit a note
//route to unsave a note


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});