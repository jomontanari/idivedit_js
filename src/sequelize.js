var models = require("./models.js");
var dateformatter = require('./dateformatter.js')

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