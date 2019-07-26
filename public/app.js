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
        const articleId = $(".favBtn").attr("id");
        console.log("FavId: " + articleId);
    });

    $("#articles").on("click", ".noteBtn", function () {
        console.log("Note Button Clicked");
        const articleId = $(".favBtn").attr("id");
        console.log("AricleId: " + articleId);
    });

// });