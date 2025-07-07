import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';
import TodoManager from './todoManager.js';
import Storage from './storage.js';

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
    
    // Test creating a todo and toggling it
    const todo = manager.createTodo('Test todo', 'Test description');
    console.log('Created todo:', todo);
    
    manager.toggleTodoComplete(todo.id);
    console.log('Todo after toggle:', todo);
    
    // Test storage
    const storage = new Storage();
    const testData = { test: 'data', projects: manager.getAllProjects() };
    storage.saveData(testData);
    console.log('Saved data to localStorage');
    
    const loadedData = storage.loadData();
    console.log('Loaded data from localStorage:', loadedData);
}

function initTodoApp() {
    console.log('Todo app initialized');
    testClasses();
    testTodoManager();
}

initTodoApp(); 