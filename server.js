
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

mongoose.connect(MONGODB_URI);

// let dbMon = mongoose.connection;

// dbMon.on("error", function (error) {
//     console.log("Mongoose error: ", error);
// });

// dbMon.once("open", function () {
//     console.log("Mongoose connection successful.");
// });


// START API CALLS
//===========================================================
// =============VIEW CALLS============
// app.get("/", function (req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             hbsObject = {
//                 article: dbArticle
//             }
//             res.render("index", hbsObject);

//         }).catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });


// app.get("/favorite", function (req, res) {
//     db.Article.find({
//         favorite: true
//     }).then(function (dbArticle) {
//         hbsObject = {
//             article: dbArticle
//         }
//         res.render("favorite", hbsObject);
//     }).catch(function (err) {
//         res.json(err);
//     })
// });

// // =================Database Calls================
// //function to scrape Rotten Tomatoes and get title, URL and description
// // //route to list all scraped headlines
;


// //Route to display all articles from the DB
// app.get("/articles/all", function (req, res) {
//     // Grab every document in the Articles collection
//     db.Article.find({})
//         .then(function (dbArticle) {
//             // If we were able to successfully find Articles, send them back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });


// //route to  delete a note
// app.delete("/clear/all", function (req, res) {
//     db.Article.remove({}, function (err) {
//         console.log('collection removed');
//     });
// });

// //route to save an article
// app.put("/favorite/:id", function (req, res) {
//     console.log(chalk.green(req.params.id + " BEING UPDATED"));
//     db.Article.findOneAndUpdate({ _id: req.params.id }, { favorite: true }, { new: true })
//         .catch(function (err) {
//             res.json(err);
//         });
//     res.status(200);
// });

// //route to unsave an article
// app.post("/unfavorite/:id", function (req, res) {
//     console.log(chalk.green(req.params.id + " BEING UPDATED"));
//     db.Article.findOneAndUpdate({ _id: req.params.id }, { favorite: false }, { new: true })
//         .catch(function (err) {
//             res.json(err);
//         });
//     res.status(200);
// });

// //route to save a note on a saved article
// app.post("/note/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. 
//             //Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             // return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
//             return db.Article.updateOne({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true })
//             // Promise.resolve(db.Article.updateOne({ _id: req.params.id }, {$push: {notes: dbNote._id}}, { new: true }))
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

//route to list all saved articles
//route to edit a note
//route to unsave a note


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});