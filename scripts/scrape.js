// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
    return axios.get("https://editorial.rottentomatoes.com/").then(function(response) {
        var $ = cheerio.load(response.data);

        var articlesArr = [];

        $("a.articleLink").each(function (i, element) {

            var title = $(element).find("p.title").text().trim();
            var publication = $(element).find("p.publication-date").text().trim();
            var link = $(element).attr("href").trim();
            var image = $(element).find(".editorialColumnPic").find("img").attr("src").trim();

            if (title && publication && link && image) {
                var newArticle = {
                    title: title,
                    publication: publication,
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