$(document).ready(function () {

    $(document).on("click", ".scrapeBtn", handleScrape);
    $(document).on("click", ".clearBtn", handleClear);
    $(document).on("click", ".favBtn", handleFavorite);
    

    //Calls the scrape API and reloads the page with new data
    function handleScrape() {
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/article/scrape").then(function (data) {
            location.reload();
        });
    };

    //Calls the clear function and reloads with no data
    function handleClear() {
        $.get("api/article/clear").then(function () {
            location.reload();
        });
    };


    //Switches between Fav and Unfav on FrontEnd
    function handleFavorite() {
        event.preventDefault();

        const articleInfo = $(this).parents(".article-card").data();
        let oldVal = articleInfo.fav;

        //Switching the boolean values with the !
        articleInfo.fav = !oldVal;

        putFavoriteinDB(articleInfo)
        //Switching classes based on the boolean
        $(`span[data-_id="${articleInfo._id}"`)
                .removeClass(`heart-${oldVal}`)
                .addClass(`heart-${!oldVal}`);     
    };

    //Makes PUT request for Favorites based on IDs
    function putFavoriteinDB(artObj) {
        $.ajax({
            method: "PUT",
            url: "api/article/" + artObj._id,
            data: artObj
        }).catch(function (err) {
            res.json(err);
        });
    }

});

