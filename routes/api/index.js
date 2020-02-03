const router = require("express").Router();
const articleRoutes = require("./articleRoutes");
const noteRoutes = require("./noteRoutes");

// Scraper routes
router.use("/note", noteRoutes);
router.use("/article", articleRoutes);

module.exports = router;
