$(document).ready(function(){

    $("#scrapeBtn").click(function () {
        event.preventDefault();
        console.log("I've been clicked");
    
        $.ajax({
            method: "GET",
            url: "/scrape"
            // success: function (data) {
            //     if (data.success == true) { // if true (1)
            //         setTimeout(function () {// wait for 5 secs(2)
            //             location.reload(); // then reload the page.(3)
            //         }, 5000);
            //     }
            // }
        }).then(function (data) {
            console.log(data);
            location.reload();
    
        }).catch(function (err) {
            res.json(err);
        });
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
        const articleId = $(this).attr("data-id");
        console.log("FavId: " + articleId);
    
    
        $.ajax({
            method: "PUT",
            url: "/favorite/" + articleId
        }).then(function (data) {
            console.log("favorite POST REQUEST: " + data);
        }).catch(function (err) {
            res.json(err);
        });
    });
    
    //When the user clicks to add a note for an article...
    $(".articles").on("click", ".noteBtn", function () {
        //The notes section shows up
        $("#notes-modal").modal('show');
        console.log("Note Button Clicked");
        //Adding variables to the notes section to use later in API calls
        let articleTitle = $(this).attr("data-title");
        // console.log("AricleTitle: " + articleTitle);
        let articleId = $(this).attr("data-id");
        // console.log("AricleId: " + articleId);
        //Adding note heading from Article Title and articleID to the submit button
        $("#note-heading").text("Make a Note For " + articleTitle);
        $("#submitNoteBtn").attr("data-id", articleId);
    });
    
    $("#add-note-form").on("submit", function () {
        //stops page from refreshing
        return false;
    });
    
    $("#submitNoteBtn").on("click", function (event) {
        event.preventDefault();
        let articleId = $(this).attr("data-id");
        console.log("SUBMIT BTN ARTICLE ID " + articleId);
    
        let newNote = $("#note-text-area").val().trim();
        console.log("NOTE AREA " + newNote);
    
        $.ajax({
            method: "POST",
            url: "/note/" + articleId,
            data: { body: newNote }
            //TODO add article id to the data body
        }).then(function (data) {
            console.log("ADD NOTE REQUEST " + data);
            // $("#note-heading").empty();
            // $("#note-text-area").val("");
        }).catch(function (err) {
            res.json(err);
        })
        return false;
    });


})

