var router = require("express").Router();
var db = require("../../models");

// This route renders the homepage
router.get("/", function(req, res) {
  db.Article.find()
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("home", { articles: dbArticles });
    });
});

// This route renders the favorite handlebars page
router.get("/favorite", function(req, res) {
  db.Article.find({ favorite: true })
    .sort({ date: -1 })
    .then(function(dbArticles) {
      res.render("favorite", { articles: dbArticles });
    });
});

module.exports = router;
