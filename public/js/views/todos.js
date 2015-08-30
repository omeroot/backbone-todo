var app = app || {}

app.TodoView = Backbone.View.extend({
  tagName : 'li',
  itemTemplate : _.template($('#item-template').html()),
  events : {
    'click .toggle' : 'toggleCompleted',
    'click .destroy' : 'clear',
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close'
  },
  initialize : function(){
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.clear);
    this.listenTo(this.model, 'visible', this.toggleVisible);
  },
  render : function(){
    this.$el.html(this.itemTemplate(this.model.toJSON()));
    this.$input = this.$('.edit');
    return this;
  },
  toggleCompleted : function(){
    this.model.toggle();
  },
  toggleVisible : function(){
    console.log(this.model)
    this.$el.toggleClass('hidden',this.isHidden());
  },
  isHidden : function(){
    var isCompleted = this.model.get('completed');
    return(
      (!isCompleted && app.TodoFilter === 'completed')
      || (isCompleted && app.TodoFilter === 'active')
    );
  },
  clear : function(){
    this.model.destroy();
  },
  edit : function(){
    this.$el.addClass('editing');
    this.$input.focus();
  },
  close : function(){
    var value = this.$input.val().trim();

    if( value ){
      this.model.save({item : value});
    }
    this.$el.removeClass('editing');
  },
  updateOnEnter : function( event ){
    if(event.keyCode == 13)
      this.close();
  }
});
