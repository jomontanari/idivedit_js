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

// Private methods
var errorFn = function(response) {
    return function() {
        console.log("Error!")
        response.send("")
    };
};

// TODO: render on server to avoid multiple requests
app.get("/", function(request, response) {
    var params = {};

    var reviewQuery = sequelize.query(models.Review, {limit: 5, order: "createdAt DESC"}, function(reviews) {
        params.reviews = reviews;
    }, errorFn());

    var countryQuery = sequelize.query(models.Country, null, function(countries) {
        console.log(countries);
        params.countries = countries;
    }, errorFn());

    sequelize.multipleQueries(sequelize.getChainer(), [reviewQuery, countryQuery], function() {
        response.render("index", params);
    }, errorFn());
});

app.use("/review/add", function(request, response) {
    response.render("addreview");
});

// TODO: remove the need for this
app.get('/countries', function(request, response) {
    sequelize.list(response, models.Country);
});

app.get('/resorts/:countryid', function(request, response) {
    sequelize.listWithCallback(models.Resort, {where: "countryid = " + request.params.countryid}, function(results) {
        response.json(jsonObjectBuilder.buildJsonObject(results));
    });
});

// TODO: Move some responsibilities elsewhere (SRP)
app.get('/resort/:id', function(request, response) {
    var params = {};
    var resortid = request.params.id;

    var reviewQuery = sequelize.query(models.Review, {where: "resortid = " + resortid}, function(reviews) {
        params.reviews = reviews;
        params.count = reviews.length;
    }, errorFn());

    var resortQuery = sequelize.query(models.Resort, {where: "id = " + resortid}, function(resorts) {
        params.resort = resorts[0];
    }, errorFn());

    sequelize.multipleQueries(sequelize.getChainer(), [reviewQuery, resortQuery], function() {
        response.render("reviews", params);
    }, errorFn());
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

