const router = require("express").Router();
const noteController = require("../../controllers/noteController");

// Matches with "/api/note/:id"
router.route("/:articleId")
  .get(noteController.findNote)
  .post(noteController.addNote)
  .delete(noteController.deleteNote)


module.exports = router;
