const db = require("../models");

module.exports = {
  findNote: function (req, res) {
    db.Article
      .findById(req.params.articleId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addNote: function(req, res) {
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate(
        { _id: req.params.articleId }, 
        { $push: {note: dbNote._id }}, 
        { new: true })
        .populate("note");
    })
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
  },
  // Delete a note with a given id
  deleteNote: function(req, res) {
    db.Article
      .findOneAndDelete({ _id: req.params.id })
      .then(function(dbNote) {
        res.json(dbNote);
    });
  }
};