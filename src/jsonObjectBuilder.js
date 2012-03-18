exports.buildJsonObject = function(results) {
    var jsonObj = [];
    results.forEach(function(result) {
        jsonObj.push(result.values);
    });
    return jsonObj;
};