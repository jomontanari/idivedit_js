var IDivedIt = IDivedIt || {};

IDivedIt.CountryModel = Backbone.Model.extend({
});

IDivedIt.CountryListModel = Backbone.Collection.extend({

    model: IDivedIt.CountryModel,

    url: "/countries"

});

IDivedIt.CountryView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, "showResorts", "resortListId");
    },

    tagName: "li",

    template: IDivedIt.Templates.Country,

    events: {
        "click .country" : "showResorts"
    },

    resortListId: function () {
        return "#resortsfor" + this.model.get("id");
    },

    showResorts: function(e) {
        e.preventDefault();
        this.resortsView = new IDivedIt.ResortListView({ el: $(this.resortListId()), countryid: this.model.get("id")});
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

IDivedIt.CountryListView = Backbone.View.extend({

    initialize: function(){
      _.bindAll(this, 'render');
        this.model = new IDivedIt.CountryListModel({view: this});
        this.model.fetch({success: this.render, error: function() {console.log("error")}});
    },

    render: function() {
        var $el = this.$el;

        this.model.each(function(country) {
            var view = new IDivedIt.CountryView({model: country});
            $el.append(view.render().el);
        });

    }
});
