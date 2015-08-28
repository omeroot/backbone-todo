var app = app || {}


app.TodoList = Backbone.Collection.extend({
  model : app.Todo,
  localStorage : new Backbone.LocalStorage('todos-backbones'),
  completed : function(){
    return this.filter(function( todo ){
      return this.get('completed');
    })
  },
  remaining : function(){
    return this.without.apply(this, this.completed());
  }
});
