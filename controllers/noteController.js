const db = require("../models");

module.exports = {
  findAllNotes: function (req, res) {
    db.Note
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findNoteById: function (req, res) {
    db.Note
      .findById(req.params.noteId)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};