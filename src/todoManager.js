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
}

export default TodoManager; 