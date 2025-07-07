import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';
import TodoManager from './todoManager.js';
import Storage from './storage.js';
import UI from './ui.js';



function initTodoApp() {
    console.log('Todo app initialized');
    
    // Initialize the app
    const todoManager = new TodoManager();
    const ui = new UI(todoManager);
    
    console.log('UI initialized with TodoManager');
}

initTodoApp(); 