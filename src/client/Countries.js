var IDivedIt = IDivedIt || {};

IDivedIt.CountryModel = Backbone.Model.extend({
});

IDivedIt.CountryListModel = Backbone.Collection.extend({

    model: IDivedIt.CountryModel,

    url: "/countries"

});

IDivedIt.CountryView = Backbone.View.extend({

    initialize: function() {
        _.bindAll(this, "showResorts", "resortListId", "toggleResorts");
        this.resortsVisible = false;
    },

    tagName: "li",

    template: IDivedIt.Templates.Country,

    events: {
        "click .country" : "toggleResorts"
    },

    resortListId: function () {
        return "#resortsfor" + this.model.get("id");
    },

    toggleResorts: function(e) {
        e.preventDefault();
        (this.resortsVisible) ? this.hideResorts() : this.showResorts();
    },

    hideResorts: function() {
        this.resortsVisible = false;
        this.resortsView.hideResorts();
    },

    showResorts: function() {
        this.resortsVisible = true;
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
        this.model.on("reset", this.render);
        this.model.reset(IDivedIt.CountriesJSON);
    },

    render: function() {
        var el = this.el;
        this.model.each(function(country) {
            var elementId = "#country" + country.id;
            new IDivedIt.CountryView({model: country, el: $(el).find(elementId)});
        });

    }
});
