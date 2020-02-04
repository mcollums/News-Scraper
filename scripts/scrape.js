// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
    return axios.get("https://editorial.rottentomatoes.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        // console.log("Scraping");

        var articlesArr = [];

        $("a.articleLink").each(function (i, element) {

            var title = $(element).find("p.title").text().trim();
            var date = $(element).find("p.publication-date").text().trim();
            var link = $(element).attr("href").trim();
            var image = $(element).find(".editorialColumnPic").find("img").attr("src").trim();
            // console.log(image);

            if (title && date && link && image) {
                var newArticle = {
                    title: title,
                    date: date,
                    link: link,
                    image: image
                }

                articlesArr.push(newArticle);
            }
        });
        return articlesArr;

    });
};

module.exports = scrape;