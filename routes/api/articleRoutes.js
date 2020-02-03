const router = require("express").Router();
const articleController = require("../../controllers/articleController");

// // Matches with "/api/article"
// router.route("/")
//   .get(articleController.findAllArticles);

// // Matches with "/api/article/:id"
// router.route("/:articleId")
//   .get(articleController.findArticleById);

router.get("/", articleController.findAllArticles);
router.get("/:id", articleController.findArticleById);
// router.delete("/:id", articleController.delete);
// router.put("/:id", articleController.update);


module.exports = router;
