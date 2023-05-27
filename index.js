const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');
const savedTheme = localStorage.getItem('savedTheme') || 'standard';

toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

changeTheme(savedTheme);

function addToDo(event) {
    event.preventDefault();
    const todoValue = toDoInput.value;
    if (todoValue === '') {
        alert("You must write something!");
        return;
    }
    saveLocal(todoValue);
    const todoDiv = createToDoElement(todoValue);
    toDoList.appendChild(todoDiv);
    toDoInput.value = '';
    totalTasks();
}

function deleteCheck(event) {
    const item = event.target;
    const todoElement = item.parentElement;
    if (item.classList.contains('delete-btn')) {
        todoElement.classList.add("fall");
        removeLocalTodos(todoElement);
        todoElement.addEventListener('transitionend', () => todoElement.remove());
    }
    if (item.classList.contains('check-btn')) {
        todoElement.classList.toggle("completed");
    }
    totalTasks();
}

function saveLocal(todo) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach(todo => {
        const todoDiv = createToDoElement(todo);
        toDoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const todoIndex = todos.indexOf(todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createToDoElement(todoValue) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo', `${savedTheme}-todo`);

    const newToDo = document.createElement('li');
    newToDo.innerText = todoValue;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    todoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    todoDiv.appendChild(deleted);

    return todoDiv;
}

function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    document.body.className = color;
    const darkerTitle = document.getElementById('title');
    const input = document.querySelector('input');
    const todoItems = document.querySelectorAll('.todo');
    const buttons = document.querySelectorAll('button');

    darkerTitle.classList.toggle('darker-title', color === 'darker');
    input.className = `${color}-input`;

    todoItems.forEach(todo => {
        todo.classList.toggle('completed', Array.from(todo.classList).includes('completed'));
        todo.className = `todo ${color}-todo`;
    });

    buttons.forEach(button => {
        const buttonClass = Array.from(button.classList).find(item => item.includes('btn'));
        button.className = `${buttonClass} ${color}-button`;
    });
}

const dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleString();

function totalTasks() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    document.getElementById("totalTasks").innerHTML = todos.length;
}

totalTasks();
