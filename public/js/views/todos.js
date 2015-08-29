var app = app || {}

app.TodoView = Backbone.View.extend({
  el : 'li',
  itemTemplate : _.template($('#item-template').html()),
  events : {
    'dblclick label' : 'edit',
    'keypress .edit' : 'updateOnEnter',
    'blur .edit' : 'close'
  },
  initialize : function(){
    this.listenTo(this.model, 'change', this.render);
  },
  render : function(){
    this.$el.html(this.itemTemplate(this.model.toJSON()));
    this.$input = this.$('.edit');
    return this;
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
