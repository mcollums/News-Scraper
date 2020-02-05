var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  db.Article.find()
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("home", { 
        article: dbArticles,
        style: 'homepage.css',
        title: 'Home - Rotten Tomatoes Scraper' 
      });
    });
});

// This route renders the favorite handlebars page
router.get("/favorite", function(req, res) {
  db.Article.find({ favorite: true })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("favorite", { 
        article: dbArticles,
        style: 'favorite.css',
        title: 'Favorites - Rotten Tomatoes Scraper' 
      });
    });
});

module.exports = router;
