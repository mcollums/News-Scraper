$(document).ready(function () {

    $(document).on("click", ".scrapeBtn", handleScrape);
    $(document).on("click", ".clearBtn", handleClear);
    $(document).on("click", ".favBtn", handleFavorite);
    $(document).on("click", ".addNoteBtn", handleNotes);
    

    //Calls the scrape API and reloads the page with new data
    function handleScrape() {
        console.log("Handle Scrape function")
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/article/scrape").then(function (data) {
            location.reload();
        });
    };

    //Calls the clear function and reloads with no data
    function handleClear() {
        console.log("Handle Clear function")

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
        }).then(function (data) {
            console.log("Favorite Changed!")
        }).catch(function (err) {
            res.json(err);
        });
    }


    function handleNotes() {
        //The notes section shows up
        $("#notes-modal").modal('show');
        console.log("Note Button Clicked");
    }
    // //When the user clicks to add a note for an article...
    // $(".articles").on("click", ".noteBtn", function () {
    //     //The notes section shows up
    //     $("#notes-modal").modal('show');
    //     console.log("Note Button Clicked");
    //     //Adding variables to the notes section to use later in API calls
    //     let articleTitle = $(this).attr("data-title");
    //     // console.log("AricleTitle: " + articleTitle);
    //     let articleId = $(this).attr("data-id");
    //     // console.log("AricleId: " + articleId);
    //     //Adding note heading from Article Title and articleID to the submit button
    //     $("#note-heading").text("Make a Note For " + articleTitle);
    //     $("#submitNoteBtn").attr("data-id", articleId);
    // });

    // $("#add-note-form").on("submit", function () {
    //     //stops page from refreshing
    //     return false;
    // });

    // $("#submitNoteBtn").on("click", function (event) {
    //     event.preventDefault();
    //     let articleId = $(this).attr("data-id");
    //     console.log("SUBMIT BTN ARTICLE ID " + articleId);

    //     let newNote = $("#note-text-area").val().trim();
    //     console.log("NOTE AREA " + newNote);

    //     $.ajax({
    //         method: "POST",
    //         url: "/note/" + articleId,
    //         data: { body: newNote }
    //         //TODO add article id to the data body
    //     }).then(function (data) {
    //         console.log("ADD NOTE REQUEST " + data);
    //         // $("#note-heading").empty();
    //         // $("#note-text-area").val("");
    //     }).catch(function (err) {
    //         res.json(err);
    //     })
    //     return false;
    // });


});

