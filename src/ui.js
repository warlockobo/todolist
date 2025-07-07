import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

class UI {
    constructor(todoManager) {
        this.todoManager = todoManager;
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.projectsList = document.getElementById('projects-list');
        this.todosContainer = document.getElementById('todos-container');
        this.currentProjectName = document.getElementById('current-project-name');
        this.newProjectBtn = document.getElementById('new-project-btn');
        this.newTodoBtn = document.getElementById('new-todo-btn');
        
        // Modal elements
        this.newProjectModal = document.getElementById('new-project-modal');
        this.newTodoModal = document.getElementById('new-todo-modal');
        this.newProjectForm = document.getElementById('new-project-form');
        this.newTodoForm = document.getElementById('new-todo-form');
    }

    bindEvents() {
        this.newProjectBtn.addEventListener('click', () => this.showNewProjectModal());
        this.newTodoBtn.addEventListener('click', () => this.showNewTodoModal());
        
        // Modal close buttons
        this.newProjectModal.querySelector('.modal-close').addEventListener('click', () => this.hideNewProjectModal());
        this.newTodoModal.querySelector('.modal-close').addEventListener('click', () => this.hideNewTodoModal());
        
        // Cancel buttons
        document.getElementById('cancel-project').addEventListener('click', () => this.hideNewProjectModal());
        document.getElementById('cancel-todo').addEventListener('click', () => this.hideNewTodoModal());
        
        // Form submissions
        this.newProjectForm.addEventListener('submit', (e) => this.handleNewProjectSubmit(e));
        this.newTodoForm.addEventListener('submit', (e) => this.handleNewTodoSubmit(e));
        
        // Close modal when clicking outside
        this.newProjectModal.addEventListener('click', (e) => {
            if (e.target === this.newProjectModal) this.hideNewProjectModal();
        });
        this.newTodoModal.addEventListener('click', (e) => {
            if (e.target === this.newTodoModal) this.hideNewTodoModal();
        });
    }

    render() {
        this.renderProjects();
        this.renderTodos();
        this.updateCurrentProjectName();
    }

    renderProjects() {
        this.projectsList.innerHTML = '';
        const projects = this.todoManager.getAllProjects();
        
        projects.forEach(project => {
            const li = document.createElement('li');
            li.className = 'project-item';
            li.innerHTML = `
                <div class="project-info">
                    <button class="project-btn ${project.id === this.todoManager.getCurrentProject()?.id ? 'active' : ''}">
                        ${project.name} (${project.getTodoCount()})
                    </button>
                    ${project.description ? `<p class="project-description">${project.description}</p>` : ''}
                </div>
                ${project.name !== 'Default' ? `<button class="project-delete-btn" title="Delete project">&times;</button>` : ''}
            `;
            
            li.querySelector('.project-info').addEventListener('click', () => {
                this.todoManager.setCurrentProject(project.id);
                this.render();
            });
            
            const deleteBtn = li.querySelector('.project-delete-btn');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.deleteProject(project);
                });
            }
            
            this.projectsList.appendChild(li);
        });
    }

    renderTodos() {
        this.todosContainer.innerHTML = '';
        const currentProject = this.todoManager.getCurrentProject();
        
        if (!currentProject || currentProject.todos.length === 0) {
            this.todosContainer.innerHTML = '<p>No todos yet. Create your first todo!</p>';
            return;
        }

        currentProject.todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.todosContainer.appendChild(todoElement);
        });
    }

    createTodoElement(todo) {
        const div = document.createElement('div');
        div.className = `todo-item ${todo.completed ? 'completed' : ''} ${todo.isOverdue() ? 'overdue' : ''}`;
        div.innerHTML = `
            <div class="todo-header">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} class="todo-checkbox">
                <h3 class="todo-title">${todo.title}</h3>
                <span class="todo-priority ${todo.priority}">${todo.priority}</span>
                <button class="btn btn-delete">Delete</button>
            </div>
            <div class="todo-details">
                <p class="todo-description">${todo.description}</p>
                ${todo.dueDate ? `<p class="todo-due-date">Due: ${this.formatDueDate(todo.dueDate)}</p>` : ''}
            </div>
        `;

        // Add event listeners
        const checkbox = div.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => {
            this.todoManager.toggleTodoComplete(todo.id);
            this.render();
        });

        const deleteBtn = div.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', () => {
            this.todoManager.deleteTodo(todo.id);
            this.render();
        });

        return div;
    }

    updateCurrentProjectName() {
        const currentProject = this.todoManager.getCurrentProject();
        this.currentProjectName.textContent = currentProject ? currentProject.name : 'No Project';
    }

    showNewProjectModal() {
        this.newProjectModal.classList.add('show');
        document.getElementById('project-name').focus();
    }

    hideNewProjectModal() {
        this.newProjectModal.classList.remove('show');
        this.newProjectForm.reset();
    }

    showNewTodoModal() {
        this.newTodoModal.classList.add('show');
        document.getElementById('todo-title').focus();
    }

    hideNewTodoModal() {
        this.newTodoModal.classList.remove('show');
        this.newTodoForm.reset();
    }

    handleNewProjectSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('project-name').value.trim();
        const description = document.getElementById('project-description').value.trim();
        
        if (name) {
            this.todoManager.createProject(name, description);
            this.hideNewProjectModal();
            this.render();
        }
    }

    handleNewTodoSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('todo-title').value.trim();
        const description = document.getElementById('todo-description').value.trim();
        const dueDate = document.getElementById('todo-due-date').value;
        const priority = document.getElementById('todo-priority').value;
        
        if (title) {
            this.todoManager.createTodo(title, description, dueDate || null, priority);
            this.hideNewTodoModal();
            this.render();
        }
    }

    formatDueDate(dueDate) {
        const date = new Date(dueDate);
        if (isToday(date)) {
            return 'Today';
        } else if (isTomorrow(date)) {
            return 'Tomorrow';
        } else if (isYesterday(date)) {
            return 'Yesterday';
        } else {
            return format(date, 'MMM d, yyyy');
        }
    }

    deleteProject(project) {
        if (confirm(`Are you sure you want to delete "${project.name}"? This will also delete all todos in this project.`)) {
            this.todoManager.deleteProject(project.id);
            this.render();
        }
    }
}

export default UI; 