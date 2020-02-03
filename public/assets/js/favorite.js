$(document).ready(function(){

    $("#viewnotes").hide();
    $("#addnotes").hide();
    
    $("#articles").on("click", ".unfavBtn", function () {
        console.log("Unfavorite Button Clicked");
        const articleId = $(".unfavBtn").attr("data-id");
        console.log("UnFavId: " + articleId);
    
    
        $.ajax({
            method: "POST",
            url: "/unfavorite/" + articleId
        }).then(function(data){
            console.log("UNfavorite POST REQUEST: " + data );
        }).catch(function(err){
            if (err) throw err;
    
        });
    });

})



