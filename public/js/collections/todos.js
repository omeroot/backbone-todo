var app = app || {}


app.TodoList = Backbone.Collection.extend({
  model : app.Todo,
  localStorage : new Backbone.LocalStorage('todos-backbones'),
  completed : function(){
    return this.filter(function( todo ){
      return todo.get('completed');
    });
  },
  remaining : function(){
    return this.without.apply(this, this.completed());
  },
  nextOrder : function(){
    if(!this.length){
      return 1;
    }else{
      return this.last().get('order') + 1;
    }
  },
  comparator : function(){
    return this.get('order');
  }
});

app.Todos = new app.TodoList();
