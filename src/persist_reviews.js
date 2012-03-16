var persistence = require('./persistencejs').persistence;
var persistenceStore = require('./persistence.store.mysql');

persistenceStore.config(persistence, '127.0.0.1', 3306, 'idivedit_js', 'root', '');

var Review = persistence.define('Reviews', {
  id: "INT",
  title: "TEXT",
  content: "TEXT",
  datecreated: "TEXT"
});

var session = persistenceStore.getSession();

exports.getReviews = function(response) {
    Review.all(session).order("id", false).list(null,function(results) {
       response.json(results);
    });
}
