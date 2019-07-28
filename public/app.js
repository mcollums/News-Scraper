// var displayData = function (data) {
//     for (var i = 0; i < data.length; i++) {
//         var favButton = `<button class="favBtn" type="button" id=${data[i]._id}> Add to Favorites </button> `;
//         var noteButton = `<button class="noteBtn" type="button" id=${data[i]._id}> Add a Note </button> `;

//         // Display the apropos information on the page
//         $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title +
//             "<br />" + data[i].link + "<br />" + data[i].date + "<br />" + data[i].image + "<br />" + favButton + "<br />" + noteButton + "</p>");
//     }
// }

// // Grab the articles as a json
// $.getJSON("/articles", function (data) {
//     displayData(data);
// });

// $(document).ready(function () {
    $("#notes").hide();
// });

    $("#scrapeBtn").click(function () {
        event.preventDefault();
        console.log("I've been clicked");

        $.ajax({
            method: "GET",
            url: "/scrape",
            success: function (data) {
                if (data.success == true) { // if true (1)
                    setTimeout(function () {// wait for 5 secs(2)
                        location.reload(); // then reload the page.(3)
                    }, 5000);
                }
            }
        }).then(function (data) {
            displayData(data);
        }).catch(function (err) {
            res.json(err);
        });

        location.reload();
    });

    $("#clearBtn").click(function () {
        event.preventDefault();
        $.ajax({
            method: "DELETE",
            url: "/clear/all",
            success: function (data) {
                if (data.success == true) { // if true (1)
                    setTimeout(function () {// wait for 5 secs(2)
                        location.reload(); // then reload the page.(3)
                    }, 5000);
                }
            }
        }).then(function (data) {
            displayData(data);
        }).catch(function (err) {
            res.json(err);
        });
        location.reload();
    });


    $("#articles").on("click", ".favBtn", function () {
        console.log("Favorite Button Clicked");
        const articleId = $(".favBtn").attr("data-id");
        console.log("FavId: " + articleId);


        $.ajax({
            method: "PUT",
            url: "/favorite/" + articleId
        }).then(function(data){
            console.log("FAVORITES POST REQUEST: " + data );
        }).catch(function(err){
            res.json(err);
        });
    });

    //When the user clicks to add a note for an article...
    $("#articles").on("click", ".noteBtn", function () {
        //The notes section shows up
        $("#notes").show();
        // console.log("Note Button Clicked");
        //Adding variables to the notes section to use later in API calls
        const articleTitle = $(this).attr("data-title");
        // console.log("AricleTitle: " + articleTitle);
        const articleId = $(this).attr("data-id");
        // console.log("AricleId: " + articleId);
        //Adding note heading from Article Title and articleID to the submit button
        $("#note-heading").text("Make a Note For " + articleTitle);
        $("#submitNoteBtn").attr("data-id", articleId);
    });

    $("#submitNoteBtn").on("click", function(){
        event.preventDefault();
        console.log("Note Submit Clicked");
        const articleId = $(this).attr("data-id");
        console.log("SUBMIT BTN ARTICLEID " + articleId);

        const newNote = $("#note-text-area").val().trim();
        console.log("NOTE AREA " + newNote);

        $.ajax({
            method: "POST",
            url: "/note/" + articleId,
            data: { body: newNote }
        }).then(function(data){
            console.log("ADD NOTE REQUEST " + data);
            $("#note-heading").empty();
            $("#note-text-area").val("");
            $("#notes").hide();
        }).catch(function(err){
            res.json(err);
        })
    });