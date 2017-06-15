describe("Todo View", function() {
    beforeEach(function(){
        this.todo = new app.Todo({title: 'First things come first'});
        spyOn(app.TodoView.prototype, 'render').and.callThrough();
        spyOn(app.TodoView.prototype, 'toggleComplete').and.callThrough();
        spyOn(app.TodoView.prototype, 'remove').and.callThrough();
        this.todoView = new app.TodoView({model: this.todo});
        this.todoView.render();
    });

    it("should display the title of the todo", function() {
        var HTML = this.todoView.$el.html();
        var title = this.todo.get('title');
        expect(HTML.indexOf(title)).not.toBe(-1);
    });

    it("should have an toggleBtn click event", function() {
        expect(this.todoView.events['click .toggleComplete']).toBeDefined();
        expect(this.todoView.events['click .toggleComplete']).toEqual('toggleComplete');
    });

    it("should have destroy button click event", function() {
        expect(this.todoView.events['click .destroy-btn']).toBeDefined();
        expect(this.todoView.events['click .destroy-btn']).toEqual('clear');
    });

    it("should remove the todo view when clicking the destroy button", function() {
        this.todoView.$('.destroy-btn').click();
        expect(this.todoView.remove).toHaveBeenCalled();
    });

    it("should have double click event to active edit class", function() {
        expect(this.todoView.events['dblclick label']).toBeDefined();
        expect(this.todoView.events['dblclick label']).toEqual('edit');
    });

    it("should add editing class when double clicking the label", function() {
        this.todoView.$('label').trigger('dblclick');
        expect(this.todoView.$el.attr('class').indexOf('editing')).not.toBe(-1);
    });

    it("should execute the toggleCompleted method when toggling the toggleComplete btn", function() {
        this.todoView.$('.toggleComplete').click();
        expect(this.todoView.toggleComplete).toHaveBeenCalled();
    });

    it("should update when the enter key is pressed in the edit input", function(){
        expect(this.todoView.events['keyup input.edit']).toBeDefined();
        expect(this.todoView.events['keyup input.edit']).toEqual('updateOnEnter');
    });

    it("should have a blur event to close edit input", function(){
        expect(this.todoView.events['blur input.edit']).toBeDefined();
        expect(this.todoView.events['blur input.edit']).toEqual('close');
    });

    it("remove the editing class when triggering the blur event", function(){
        this.todoView.$('label').trigger('dblclick');
        this.todoView.$('input.edit').trigger('blur');
        expect(this.todoView.$el.attr('class').indexOf('editing')).toBe(-1);
    });

    it("should re-render when something in the model changes", function() {
        this.todo.set('title', 'new titletjes');
        expect(this.todoView.render).toHaveBeenCalled();
    });
});

describe("Tests for Todos collection view", function(){
    beforeEach(function(){
        this.todo0 = new app.Todo({title: 'First things come first'});
        this.todo1 = new app.Todo({title: 'Then this one'});
        this.todos = new app.Todos([this.todo0, this.todo1]);
        spyOn(app.AppView.prototype, 'render').and.callThrough();
        spyOn(app.AppView.prototype, 'addOne').and.callThrough();
        spyOn(app.AppView.prototype, 'addAll').and.callThrough();
        this.appView = new app.AppView({collection: this.todos});
    });

    it("should should have a method to add a new model", function() {
        expect(this.appView.addOne).toBeDefined();
    });

    it("should should execute addOne method when a model is added to the collection", function() {
        var todo2 = new app.Todo({title: 'Then this one'});
        this.todos.add(todo2);
        expect(this.appView.addOne).toHaveBeenCalled();
    });

    it("should have a method to add all models in the collection", function() {
        expect(this.appView.addAll).toBeDefined();
    });

    it("should should execute addAll method if the collection is re-fetched", function() {
        var calls = this.appView.addAll.calls.count();
        this.appView.collection.fetch({reset: true});
        expect(this.appView.addAll.calls.count()).toBeGreaterThan(calls);
    });

    it("should display all the titles of the todos initialy", function() {
        var listHTML = this.appView.$todoList.html();
        this.todos.forEach(function(model) {
            var title = model.get('title');
            expect(listHTML.indexOf(title)).not.toBe(-1);
        });
    });

    it("show only the remaining todos when filtering remaining",function() {
        var listHTML = this.appView.$todoList.html();
        this.todos.getRemaining().forEach(function(model) {
                expect(listHTML.indexOf(model.title)).not.toBe(-1);
        });
        this.todos.getComplete().forEach(function(model) {
                expect(listHTML.indexOf(model.title)).toBe(-1);
        });
    });
});
