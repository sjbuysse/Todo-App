var app = app || {};
(function() {
    app.Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            completed: false
        },

        toggle: function() { 
            this.set('completed', !this.get('completed'));
        }
    });
    
    app.Todos = Backbone.Collection.extend({
        model: app.Todo
    })
})();
