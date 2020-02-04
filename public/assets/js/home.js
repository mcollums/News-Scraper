$(document).ready(function () {

    var articleCont = $('#articleContainer');

    $(document).on("click", ".scrapeBtn", handleScrape);
    $(document).on("click", ".clearBtn", handleClear);
    $(document).on("click", ".favBtn", handleFavorite);


    // function loadPage() {
    //     $.get("/api/article").then(function (data) {
    //         articleCont.empty();
    //         // If we have articles, render them to the page
    //         if (data && data.length) {
    //             // displayArticles(data);
    //         } else {
    //             // Otherwise render a message explaining we have no articles
    //             //TODO ADD FEEDBACK FOR NO DATA
    //             //   renderEmpty();
    //         }
    //     });
    // };

    function handleScrape() {
        console.log("Handle Scrape function")
        // This function handles the user clicking any "scrape new article" buttons
        $.get("/api/article/scrape").then(function (data) {
            location.reload();
        });
    };

    function handleClear() {
        console.log("Handle Clear function")

        $.get("api/article/clear").then(function () {
            location.reload();
        });
    };


    function handleFavorite(id) {
        console.log("Favorite Button Clicked");
        const articleId = id;
        console.log("FavId: " + articleId);

        $.ajax({
            method: "PUT",
            url: "api/article/favorite/" + articleId
        }).then(function (data) {
            console.log("favorite POST REQUEST: " + data);
            // loadPage();
            //TODO MAKE HEART NEXT TO ARTICLES
        }).catch(function (err) {
            res.json(err);
        });
    };



    // function newCard(data) {
    //     // This function takes in a single JSON object for an article/headline
    //     // It constructs a jQuery element containing all of the formatted HTML for the
    //     // article card
    //     var card = $("<div class='card article-card'>");
    //     var cardBody = $("<div class='card-body'>").append(
    //         $("<h5 class='card-title'>").append(
    //             $("<a class='article-link' target='_blank' rel='noopener noreferrer'>")
    //                 .attr("href", article.url)
    //                 .text(article.headline),
    //             $("<a class='btn btn-sm text-light btn-primary tomato-btn'>Read on RT</a>")
    //         )
    //     );

    //     var cardBody = $("<div class='card-body'>").text(article.summary);

    //     card.append(cardHeader, cardBody);
    //     // We attach the article's id to the jQuery element
    //     // We will use this when trying to figure out which article the user wants to save
    //     card.data("_id", article._id);
    //     // We return the constructed card jQuery element
    //     return card;
    // }

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

