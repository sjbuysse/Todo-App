var app = app || {};

(function() {
    app.TodoRouter = Backbone.Router.extend({
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function(param) {
            if(param)
                param = param.trim();
            
            // set a global filter variable to the parameter and trigger the filter event on the collecion
            app.TodoFilter = param || '';
            
            app.todos.trigger('filter');
        }
    });
})();
