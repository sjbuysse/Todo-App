describe("Todo Model", function() {
    beforeEach(function() {
        this.todo = new app.Todo();
    });

    it("should describe individual todo items", function() {
        expect(this.todo.get("title")).toBeDefined();
    });

    it("should hold a completed property", function() {
        expect(this.todo.get("completed")).toBeDefined();
    });

    it("should have a method to toggle completed", function() {
        expect(this.todo.toggle).toBeDefined();
    });

    it("should toggle the completed property when calling toggle", function() {
        var completed = this.todo.get("completed");
        this.todo.toggle();
        expect(this.todo.get('completed')).toBe(!completed);
    });
    // it should hold a priority boolean
});

describe("Todo Collection", function() {
    beforeEach(function(){
        this.todo0 = new app.Todo({title: 'First things come first'});
        this.todo1 = new app.Todo({title: 'Then this one'});
        this.todo2 = new app.Todo({title: 'Completed one', completed: true});
        this.todo3 = new app.Todo({title: 'Completed two', completed: true});
        this.todos = new app.Todos([this.todo0, this.todo1, this.todo2, this.todo3]);
    });

    it("should have a localStorage property", function() {
        expect(this.todos.localStorage).toBeDefined();
    });

    it("should be able to add todos", function() {
        var length = this.todos.length;
        this.todos.add({title:  'Keep it coming' });
        expect(this.todos.length).toEqual((length + 1));
    });

    it("should be able to delete todos", function() {
        var length = this.todos.length;
        this.todos.remove(this.todo0);
        expect(this.todos.length).toEqual((length - 1));
    });

    it("should be able to return completed todos", function() {
        var complete = this.todos.getComplete();
        var count = 0;
        this.todos.forEach(function(model) {
            if(model.get('completed')) count++; 
        })
        expect(complete.length).toEqual(count);
    });

    it("should be able to return remainingd todos", function() {
        var remaining = this.todos.getRemaining();
        var count = 0;
        this.todos.forEach(function(model) {
            if(!model.get('completed')) count++; 
        })
        expect(remaining.length).toEqual(count);
    });
});
