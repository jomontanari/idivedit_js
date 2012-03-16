var express = require('express');

var app = express.createServer(express.logger());

var persist = require("./persist_reviews")

app.use("/js/lib", express.static(__dirname + "/client/lib"))
app.use("/js/views", express.static(__dirname + "/client/views"))
app.use("/js", express.static(__dirname + "/client"))

app.use("/", express.static(__dirname + "/html"))
app.use("/index.html", express.static(__dirname + "/html"))



app.get('/reviews', function(request, response) {
    persist.getReviews(response);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

