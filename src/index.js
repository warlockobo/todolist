import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';
import TodoManager from './todoManager.js';

console.log('Webpack is working!');

// Test the Todo and Project classes
function testClasses() {
    const project = new Project('Test Project', 'A test project');
    const todo = new Todo('Test Todo', 'A test todo item', new Date(), 'high');
    
    project.addTodo(todo);
    
    console.log('Project:', project);
    console.log('Todo:', todo);
    console.log('Project todos count:', project.getTodoCount());
}

// Test the TodoManager
function testTodoManager() {
    const manager = new TodoManager();
    console.log('TodoManager created:', manager.getCurrentProject());
}

function initTodoApp() {
    console.log('Todo app initialized');
    testClasses();
    testTodoManager();
}

initTodoApp(); 