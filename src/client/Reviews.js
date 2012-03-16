var IDivedIt = IDivedIt || {};

IDivedIt.ReviewModel = Backbone.Model.extend({
    urlRoot: "/review/"
});

IDivedIt.ReviewListModel = Backbone.Collection.extend({

    model: IDivedIt.ReviewModel,

    url: "/reviews"

});

IDivedIt.ReviewView = Backbone.View.extend({

    tagName: "li",

    template: IDivedIt.Templates.Review,

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

IDivedIt.AddReviewView = Backbone.View.extend({

    initialize: function() {
        this.model = new IDivedIt.ReviewModel();
        _.bindAll("add");
    },

    events: {
        "click .addreview" : "add"
    },

    // todo: refactor this and pull out common methods
    loadModelData: function(model) {
        _.each($(this.el).find("input"), function(inputObj) {
            if ($(inputObj).attr("type") === "text") {
                var propertyName = $(inputObj).attr("name");
                var propertyValue = $(inputObj).val();
                model.set(propertyName, propertyValue)
            }
        });
        _.each($(this.el).find("textarea"), function(inputObj) {
            var propertyName = $(inputObj).attr("name");
            var propertyValue = $(inputObj).val();
            model.set(propertyName, propertyValue)
        });

    },

    add: function(e) {
        e.preventDefault();
        this.loadModelData(this.model);
        this.model.save();
    }
})

IDivedIt.ReviewListView = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this, 'render');
        this.reviewListModel = new IDivedIt.ReviewListModel({view: this});
        this.reviewListModel.fetch({success: this.render, error: function() {console.log("error")}});
    },

    //todo: refactor into one loop with el outside
    render: function() {

        var views = this.reviewListModel.map(function(reviewModel) {
            console.log(reviewModel);
            return new IDivedIt.ReviewView({model: reviewModel});
        });

        var el = this.el;
        _.each(views, function(view) {
            $(el).append(view.render().el);
        })
    }

});


