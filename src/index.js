import './style.css';
import { Todo } from './Todo.js';
import { Project } from './Project.js';

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

function initTodoApp() {
    console.log('Todo app initialized');
    testClasses();
}

initTodoApp(); 