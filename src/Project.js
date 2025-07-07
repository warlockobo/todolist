export class Project {
    constructor(name, description = '') {
        this.id = Date.now() + Math.random(); // Simple unique ID
        this.name = name;
        this.description = description;
        this.todos = [];
        this.createdAt = new Date();
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    getTodoById(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    getTodosByPriority(priority) {
        return this.todos.filter(todo => todo.priority === priority);
    }

    getCompletedTodos() {
        return this.todos.filter(todo => todo.completed);
    }

    getIncompleteTodos() {
        return this.todos.filter(todo => !todo.completed);
    }

    getOverdueTodos() {
        return this.todos.filter(todo => todo.isOverdue());
    }

    getTodoCount() {
        return this.todos.length;
    }

    getCompletedCount() {
        return this.getCompletedTodos().length;
    }
} 