const router = require("express").Router();
const articleController = require("../../controllers/articleController");


// Matches with "/api/article/scrape"  
router.route("/scrape")
  .get(articleController.getNewArticles)

// Matches with "/api/article/clear"  
router.route("/clear")
  .get(articleController.clearArticles)

// Matches with "/api/article/title/:title"
router.route("/title/:articleTitle")
  .get(articleController.findArticleByTitle)

// Matches with "/api/article/:id"
router.route("/:articleId")
  .get(articleController.findArticleById)
  .put(articleController.makeFavorite)

module.exports = router;
