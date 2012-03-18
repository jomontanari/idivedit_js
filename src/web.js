var express = require('express');

var app = express.createServer(express.logger());

var models = require("./models.js");
var sequelize = require("./sequelize.js");
var jsonObjectBuilder = require("./jsonObjectbuilder.js");

app.use(express.bodyParser());
app.set("view engine", "jade");
app.set('view options', { layout: false });

app.use("/js/lib", express.static(__dirname + "/client/lib"));
app.use("/js", express.static(__dirname + "/client"));
app.use("/css", express.static(__dirname + "/css"));

// TODO: render on server to avoid multiple requests
app.get("/", function(request, response) {
    response.render("index")
});

app.use("/review/add", function(request, response) {
    response.render("addreview")
});

app.get('/review/list/:limit', function(request, response) {
    sequelize.list(response, models.Review, {order: "createdAt DESC", limit: request.params.limit});
});

app.get('/review/list', function(request, response) {
    sequelize.list(response, models.Review, {order: "createdAt DESC"});
});

app.get('/countries', function(request, response) {
    sequelize.list(response, models.Country);
});

app.get('/resortreviews/:resort', function(request, response) {
    sequelize.list(response, models.Review, {where: "resortid = " + request.params.resort});
});

app.get('/resorts/:countryid', function(request, response) {
    sequelize.listWithCallback(models.Resort, {where: "countryid = " + request.params.countryid}, function(results) {
        response.json(jsonObjectBuilder.buildJsonObject(results));
    });
});

app.get('/resort/:id', function(request, response) {
    sequelize.listWithCallback(models.Review, null, function(reviews) {
        response.render("reviews", {reviews: reviews});
    });
});

// TODO Should do something more than just send blank response
app.post("/review", function(request, response) {
    var successResponse = function() { response.send("") };
    var errorResponse = function() { response.send("") };
    sequelize.addReview(request.body, errorResponse, successResponse);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

