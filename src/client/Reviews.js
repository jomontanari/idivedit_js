var IDivedIt = IDivedIt || {};

IDivedIt.ReviewModel = Backbone.Model.extend({
    urlRoot: "/review/list"
});

IDivedIt.ReviewListModel = Backbone.Collection.extend({

    model: IDivedIt.ReviewModel,

    url: function() {
        return "/review/list/" + this.limit;
    }

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
        this.reviewListModel.limit = this.options.limit;
        this.reviewListModel.fetch({success: this.render, error: function() {console.log("error")}});
    },

    render: function() {
        var $el = this.$el;

        this.reviewListModel.each(function(reviewModel) {
            var view = new IDivedIt.ReviewView({model: reviewModel});
            $el.append(view.render().el);
        });

    }

});


