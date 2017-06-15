var app = app || {};
(function() {
    app.Todos = Backbone.Collection.extend({
        model: app.Todo,

        // Save all of the todo items under the `"todos-backbone"` namespace.
        localStorage: new Backbone.LocalStorage('todos-backbone'), 

        getComplete: function() {
            return this.where({completed: true});
        },

        getRemaining: function() {
            return this.where({completed: false});
        }
    });
})();
