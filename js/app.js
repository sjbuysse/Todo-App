var app = app || {};
var ENTER_KEY = 13;

$(function() {

    // Kick things off by creating the **App**.
    app.todos = new app.Todos();
    app.todos.fetch();
    new app.AppView({collection: app.todos});
    new app.TodoRouter();
    Backbone.history.start();
});
