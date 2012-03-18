var Sequelize = require("sequelize")
var sequelize = new Sequelize('idivedit_js', 'root', null,
{
    host: "127.0.0.1"
});

var models = require("./models.js");
var dateformatter = require('./dateformatter.js')

exports.getChainer = function() {
    return new Sequelize.Utils.QueryChainer();
}

// TODO pass callback so I don't have to pass response
// TODO move json method out
exports.list = function(response, objType, params) {
    objType.findAll(params).success(function(results) {
        var jsonObj = [];
        results.forEach(function(result) {
            jsonObj.push(result.values);
        });
        response.json(jsonObj);
    });
};

exports.listWithCallback = function(objType, params, callback) {
    objType.findAll(params).success(callback);
};

exports.addReview = function(reviewParams, success, error) {
    var review = models.Review.build(reviewParams);
    review.save().error(error).success(success);
};

// TODO have a function that returns a query object (and test it!)


exports.query = function(objType, params, successFn, errorFn) {
    return objType.findAll(params).success(successFn).error(errorFn);
}

exports.multipleQueries = function(chainer, queries, successFn, errorFn) {
    queries.forEach(function(query) {
        chainer.add(query);
    });
    chainer.run().success(successFn).error(errorFn);
}