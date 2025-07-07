import { Todo } from './Todo.js';
import { Project } from './Project.js';

class TodoManager {
    constructor() {
        this.projects = [];
        this.currentProject = null;
        this.initializeDefaultProject();
    }

    initializeDefaultProject() {
        const defaultProject = new Project('Default', 'Default project for todos');
        this.projects.push(defaultProject);
        this.currentProject = defaultProject;
    }

    // Basic project management
    createProject(name, description = '') {
        const project = new Project(name, description);
        this.projects.push(project);
        return project;
    }

    setCurrentProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            this.currentProject = project;
        }
    }

    getCurrentProject() {
        return this.currentProject;
    }

    // Basic todo management
    createTodo(title, description = '', dueDate = null, priority = 'medium') {
        if (!this.currentProject) {
            throw new Error('No current project selected');
        }

        const todo = new Todo(title, description, dueDate, priority);
        this.currentProject.addTodo(todo);
        return todo;
    }

    deleteTodo(todoId) {
        if (this.currentProject) {
            this.currentProject.removeTodo(todoId);
        }
    }

    // Additional todo operations
    toggleTodoComplete(todoId) {
        if (this.currentProject) {
            const todo = this.currentProject.getTodoById(todoId);
            if (todo) {
                todo.toggleComplete();
                return todo;
            }
        }
        return null;
    }

    updateTodo(todoId, updates) {
        if (this.currentProject) {
            const todo = this.currentProject.getTodoById(todoId);
            if (todo) {
                Object.keys(updates).forEach(key => {
                    if (todo.hasOwnProperty(key)) {
                        todo[key] = updates[key];
                    }
                });
                return todo;
            }
        }
        return null;
    }

    // Project queries
    getAllProjects() {
        return this.projects;
    }

    getProjectById(projectId) {
        return this.projects.find(project => project.id === projectId);
    }

    // Todo queries
    getTodosByPriority(priority) {
        return this.currentProject ? this.currentProject.getTodosByPriority(priority) : [];
    }

    getCompletedTodos() {
        return this.currentProject ? this.currentProject.getCompletedTodos() : [];
    }

    getIncompleteTodos() {
        return this.currentProject ? this.currentProject.getIncompleteTodos() : [];
    }
}

export default TodoManager; 