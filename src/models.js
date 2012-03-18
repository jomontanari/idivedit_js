var Sequelize = require("sequelize")
var sequelize = new Sequelize('idivedit_js', 'root', null,
{
    host: "127.0.0.1"
});

exports.Country = sequelize.define("Countries", {
    name: Sequelize.STRING
});

exports.Resort = sequelize.define("Resorts", {
    name: Sequelize.STRING
});

exports.Resort.hasOne(exports.Country, {foreignKey: "id"});

exports.Review = sequelize.define("Reviews", {
    reviewer_name: Sequelize.STRING,
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    divesitename: Sequelize.STRING,
    resortid: Sequelize.INTEGER
});