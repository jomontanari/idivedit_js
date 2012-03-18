var exports = {};
var stubs = {};
stubs.sequelize = function() {};

var require = function(type) {
    return stubs[type];
};

var getMockQueryChainer = function() {
    var mockChainer = {
        add: function() {},
        run: function() { return this; },
        success: function() { return this; },
        error: function(){ return this; }
    };
    return mockChainer;

}