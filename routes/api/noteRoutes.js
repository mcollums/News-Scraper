const router = require("express").Router();
const noteController = require("../../controllers/noteController");

//EXAMPLE FROM IN CLASS ACTIVITY
// Matches with "/api/mnote"
// router.route("/")
  // .get(noteController.findAllNotes);

// Matches with "/api/note/:id"
router.route("/:articleId")
  .get(noteController.findNote)
  .post(noteController.addNote)
  .delete(noteController.deleteNote)


module.exports = router;
