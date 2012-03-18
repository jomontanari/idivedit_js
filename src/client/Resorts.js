var IDivedIt = IDivedIt || {};

IDivedIt.ResortModel = Backbone.Model.extend({
});

IDivedIt.ResortListModel = Backbone.Collection.extend({

    model: IDivedIt.ResortModel,

    url: function() {
        return "/resorts/" + this.countryid;
    }

});

IDivedIt.ResortView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, "render");
    },

    tagName: "li",

    template: IDivedIt.Templates.Resort,

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
});

IDivedIt.ResortListView = Backbone.View.extend({

    tagName: "ul",

    initialize: function() {
        _.bindAll(this, "render");
        this.model = new IDivedIt.ResortListModel({view: this});
        this.model.countryid = this.options.countryid;
        this.model.fetch({success: this.render});
    },

    hideResorts: function() {
        this.$el.empty();
    },

    render: function() {
        var el = this.$el;

        this.model.each(function(resortModel) {
            var view = new IDivedIt.ResortView({model: resortModel});
            $(el).append(view.render().el);
        });
    }
});