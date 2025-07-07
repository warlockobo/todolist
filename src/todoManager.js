import { Todo } from './Todo.js';
import { Project } from './Project.js';
import Storage from './storage.js';

class TodoManager {
    constructor() {
        this.storage = new Storage();
        this.projects = [];
        this.currentProject = null;
        this.loadData();
        if (this.projects.length === 0) {
            this.initializeDefaultProject();
        }
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
        this.saveData();
        return project;
    }

    deleteProject(projectId) {
        this.projects = this.projects.filter(project => project.id !== projectId);
        
        // If we deleted the current project, switch to default
        if (this.currentProject && this.currentProject.id === projectId) {
            this.currentProject = this.projects[0] || null;
        }
        
        this.saveData();
    }

    setCurrentProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (project) {
            this.currentProject = project;
            this.saveData();
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
        this.saveData();
        return todo;
    }

    deleteTodo(todoId) {
        if (this.currentProject) {
            this.currentProject.removeTodo(todoId);
            this.saveData();
        }
    }

    // Additional todo operations
    toggleTodoComplete(todoId) {
        if (this.currentProject) {
            const todo = this.currentProject.getTodoById(todoId);
            if (todo) {
                todo.toggleComplete();
                this.saveData();
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

    // Storage methods
    saveData() {
        const data = {
            projects: this.projects,
            currentProjectId: this.currentProject?.id
        };
        this.storage.saveData(data);
    }

    loadData() {
        const data = this.storage.loadData();
        if (data && data.projects) {
            // Reconstruct objects from JSON
            this.projects = data.projects.map(projectData => {
                const project = new Project(projectData.name, projectData.description);
                project.id = projectData.id;
                project.createdAt = new Date(projectData.createdAt);
                
                // Reconstruct todos
                project.todos = projectData.todos.map(todoData => {
                    const todo = new Todo(
                        todoData.title,
                        todoData.description,
                        todoData.dueDate ? new Date(todoData.dueDate) : null,
                        todoData.priority,
                        todoData.notes,
                        todoData.checklist
                    );
                    todo.id = todoData.id;
                    todo.completed = todoData.completed;
                    todo.createdAt = new Date(todoData.createdAt);
                    return todo;
                });
                
                return project;
            });
            
            // Set current project
            if (data.currentProjectId) {
                this.currentProject = this.projects.find(p => p.id === data.currentProjectId);
            }
            if (!this.currentProject && this.projects.length > 0) {
                this.currentProject = this.projects[0];
            }
        }
    }
}

export default TodoManager; 