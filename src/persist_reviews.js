//todo: namespaces 
var persistence = require('./persistencejs').persistence;
var persistenceStore = require('./persistence.store.mysql');

persistenceStore.config(persistence, '127.0.0.1', 3306, 'idivedit_js', 'root', '');

var Review = persistence.define('Reviews', {
  reviewer_name: "TEXT",
  title: "TEXT",
  content: "TEXT",
  datecreated: "DATETIME"
});

var session = persistenceStore.getSession();

exports.getReviews = function(response) {
    Review.all(session).order("datecreated", false).list(null,function(results) {
       response.json(results);
    });
};

// todo: remove datecreated method into a common class
exports.addReview = function(request, response) {
    var session = persistenceStore.getSession();
    var review = new Review(request.body);
    console.log(review);
    var datecreated = new Date();
    review.datecreated = datecreated.getFullYear() + "/" + (datecreated.getMonth() + 1) + "/" + datecreated.getDate();
    session.add(review);
    session.flush();
    session.close();
    response.send("");
};