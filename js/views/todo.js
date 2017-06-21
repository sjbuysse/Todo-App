var app = app || {};
(function() {
    app.TodoView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item todo',
        template: _.template($("#todo-item").html()),

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);

            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        events: {
            'dblclick label': 'edit',
            'click .destroy-btn': 'clear',
            'click .toggleComplete': 'toggleComplete',
            'keyup input.edit': 'updateOnEnter',
            'blur input.edit': 'close'
        },

        edit: function() {
            this.$el.addClass('editing');
            this.$input.focus();
        },

        close: function() {
            var value = this.$input.val().trim();
            if(value)
                this.model.save({'title': value});

            this.$el.removeClass('editing');
        }, 

        updateOnEnter: function(e) {
            if( e.which === ENTER_KEY )
                this.close();
        }, 

        clear: function() {
            this.model.destroy();
        },

        toggleComplete: function() {
            this.model.toggle();
            this.model.save();
        },

        // returns true if the todoView should be hidden, according to the TodoFilter
        isHidden: function() {
            var isComplete = this.model.get('completed');
            // return true if the the isComplete is not in accordance with the filter
            if(app.TodoFilter === 'completed' && isComplete) 
                return false;
            else if(app.TodoFilter === 'active' && !isComplete)
                return false;
            else if(app.TodoFilter === '')
                return false;
            else
                return true;
        },

        toggleVisible: function() {
            this.$el.toggleClass("hidden", this.isHidden());
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$input = this.$('.edit');
            this.toggleVisible();
            return this;
        }
    });
})();
