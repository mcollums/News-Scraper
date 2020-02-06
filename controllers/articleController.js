var db = require("../models");
var scrape = require("../scripts/scrape");


module.exports = {
  findAllArticles: function (req, res) {
    db.Article
      .find()
      .then(function(dbModel){
            res.json(dbModel)
        })
      .catch(err => res.status(422).json(err));
  },
  findArticleById: function (req, res) {
    db.Article
      .findById(req.params.articleId)
      .populate("note")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  makeFavorite: function (req,res) {
    db.Article
      .findOneAndUpdate(
        {_id: req.params.articleId}, 
        { $set: {favorite: req.body.fav }}, 
        { new: true})
      .then(function(article){
        res.json(article)
      })
  },
  getNewArticles: function(req,res){
    return scrape()
    .then(function(articles){
      return db.Article.create(articles)
    })
    .then(function(dbRes){
      if (dbRes.length === 0){
        res.json({
          message: "Sorry, no new articles! Check back soon."
        });
      }
      else {
        res.json({
          message: "Added " + dbRes.length + " Articles to the Database"
        });
      }
    })
    .catch(function(err) {
      res.json({
        message: "Scrape complete!!"
      });
    });
  },
  clearArticles: function(req,res) {
    db.Article.remove({})
    .then(function() {
      return db.Note.remove({});
    })
    .then(function() {
      res.json({ ok: true });
    });
  }
};