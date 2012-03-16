var IDivedIt = IDivedIt || {};

IDivedIt.ReviewModel = Backbone.Model.extend({  });
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

IDivedIt.ReviewListView = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this, 'render');
        this.reviewListModel = new IDivedIt.ReviewListModel({view: this});
        this.reviewListModel.fetch({success: this.render, error: function() {console.log("error")}});
    },

    render: function() {
        var views = this.reviewListModel.map(function(reviewModel) {
            return new IDivedIt.ReviewView({model: reviewModel});
            
        });

//        $.each(this.reviewListModel.models, function(index, reviewModel){
//            console.log(reviewModel)
//            var view = new ReviewView({model: reviewModel});
//            $(this.el).append("view");
//        });
        var el = this.el;
        _.each(views, function(view) {
            $(el).append(view.render().el);
        })
    }

});


