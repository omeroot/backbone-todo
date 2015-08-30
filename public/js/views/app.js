var app = app || {};

app.AppView = Backbone.View.extend({
	el: '#todoapp',
	statsTemplate: _.template($('#stats-template').html()),
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click toggle-all': 'toggleAllComplete'
	},
	initialize: function() {
		/*
		  this.$() bu yapı this.$el e bağlı elementleri bulmak için kullanılır
		  this.el html objesini simgeler
		  local özellikleri kullanmak için jquery kullanıcaz
		*/

		this.allCheckBox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.$main = this.$('#main');

		/*
		  Todos collection ındaki add ve reset eventlerini
		  bind ediyoruz
		  update ve delete i TodoView a devredicez
		*/
		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);
		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterOne);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch();

	},
	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		if (app.Todos.length) {
			this.$main.show();

			this.$('#filters li a')
				.removeClass('selected')
				.filter('[href="#/' + (app.TodoFilter || '') + '"]')
				.addClass('selected');
		} else {
			this.$main.hide();
		}
		this.allCheckBox.checked = !remaining;
	},
	addOne: function(todo) {
		var v = new app.TodoView({
			model: todo
		});
		$('#todo-list').append(v.render().el);
	},
	addAll: function() {
		this.$('#todo-list').html('');
		app.Todos.each(this.addOne, this);
	},
	filterOne: function(todo) {
		console.log(todo);
		todo.trigger('visible');
	},
	filterAll: function() {
		app.Todos.each(this.filterOne, this);
	},
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(),
			completed: false
		}
	},
	createOnEnter: function(event) {
		var att;

		if (event.keyCode != 13) {
			return;
		}
		att = this.newAttributes();
		app.Todos.create(att);
		this.$input.val('');
	},
	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy');
		return false;
	},
	toggleAllComplete: function() {
		var completed = this.allCheckBox.checked;

		app.Todos.each(function(todo) {
			todo.save({
				'completed': completed
			});
		});

	}
});
