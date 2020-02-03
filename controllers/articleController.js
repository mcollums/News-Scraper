const db = require("../models");

module.exports = {
  findAllArticles: function (req, res) {
    db.Article
      .find()
      .then((dbModel) => {
            console.log("FOUND ITEMS IN CONTROLLER");
            res.json(dbModel)

            // res.render("index", hbsObject);
        })
      .catch(err => res.status(422).json(err));
  },
  findArticleById: function (req, res) {
    db.Article
      .findById(req.params.articleId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};