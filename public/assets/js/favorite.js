$(document).ready(function(){
    $(document).on("click", ".favBtn", handleFavorite);
    $(document).on("click", ".addNoteBtn", handleShowInput);
    $(document).on("click", "#submitNoteBtn", handleNewNote);
    $(document).on("click", ".viewNotesBtn", handleGetNotes);

    $(document).on("click", "#doneAddNotes", function() {
        event.preventDefault();
        $("#addNotes").hide();
    });

    $(document).on("click", "#note-view-toggle", function() {
        event.preventDefault();
        $("#viewNotes").hide();
    });

    
    $("#viewNotes").hide();
    $("#addNotes").hide();
    
    //Switches between Fav and Unfav on FrontEnd
    function handleFavorite() {
        event.preventDefault();

        const articleInfo = $(this).parents(".fav-card").data();
        console.log(articleInfo);
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

    function handleShowInput () {
        event.preventDefault();
        $('#viewNotes').hide();
        $('#addNotes').show();


        const articleInfo = $(this).parents(".fav-card").data();
        const title = $(this).parents('.fav-card').find(".card-title").text();

        $('#submitNoteBtn').attr("data-_id", articleInfo._id)
        $('#addNotes').find('label')
            .html(`<h5>Add note for Article:</h5><p>"${title}"</p>`);
      
    }

    function handleNewNote() {
        event.preventDefault();
        //grab article ID from submit button
        const articleInfo = $(this).data();

        //grab value of form
        let noteBody = $('#note-text-area').val();

        $.ajax({
            method: "POST",
            url: "api/note/" + articleInfo._id,
            data: {
                body: noteBody
            }
        }).then(function (data) {
            $('#addNotes').find('.dbMessage').text(`Note Posted! - "${data.note[data.note.length - 1].body}". Add Another?`)
        }).catch(function (err) {
            res.json(err);
        });
    }

    function handleGetNotes() {
        event.preventDefault();
        $("#addNotes").hide();
        $("#viewNotes").show();

        //Put title in All Notes Section
        const articleTitle = $(this).data('title');
        $('#note-section-title').text(articleTitle);

        $.ajax({
            method: "GET",
            url: "api/article/title/" + articleTitle
        }).then(function(data){
            console.log(data[0].note);
            appendNotes(data[0].note);
        }).catch(function (err) {
            res.json(err);
        });
    }

    function appendNotes(notes) {
        var location = $('#notes-wrapper').find('ul');
        for(var i = 0; i <= notes.length-1; i++) {
            location.append(`
            <li>
                <h7> ${notes[i].body} </h7>
            </li>
          `)
        }

    }

});



