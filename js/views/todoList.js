var app = app || {};
(function() {
    app.AppView = Backbone.View.extend({
        // hook AppView in existing DOM element
        el: '#todoapp', 

        // hook AppView properties into appropriate DOM elements,
        // bind relevant events to the view's collection
        initialize: function() {
            this.$todoList = $('#todo-list');
            this.$newItem = $('#new-item');

            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'reset', this.addAll);

            this.listenTo(this.collection, 'filter', this.filterAll);
            this.listenTo(this.collection, 'change:completed', this.filterOne);

            this.listenTo(this.collection, 'all', this.render);

            this.addAll();
        }, 

        events: {
            'keyup #new-item': 'createOnEnter'
        },

        addOne: function(todo) {
            var todoView = new app.TodoView({model: todo});
            this.$todoList.append(todoView.render().el);
        },

        addAll: function() {
            this.$todoList.html("");
            this.collection.forEach(this.addOne, this);
        },

        filterOne: function(model){
            model.trigger('visible');
        },

        filterAll: function(){
            this.collection.forEach(this.filterOne);
        },

        createOnEnter: function(e) {
            if(e.which === ENTER_KEY){
                var title = this.$newItem.val().trim();
                if(title){
                    this.collection.create({title: title});
                    this.$newItem.val('');
                }
            }
        }, 

        render: function() {
            this.$('.filters a').removeClass('selected')
                .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                .addClass('selected');
        }
    });
})();
