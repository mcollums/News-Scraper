var displayData = function (data) {
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "<br />" + data[i].date + "<br />" + data[i].image + "</p>");
    }
}

// Grab the articles as a json
$.getJSON("/articles", function (data) {
    displayData(data);
});

$("#scrapeBtn").click(function () {
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
    $.ajax({
        method: "DELETE",
        url: "/clear",
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