// Selectors
const todoInput = document.getElementById("input-el");
const todoBtn = document.getElementById("inputbtn-el");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos)
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo)

// Functions

function addTodo(event) {
    event.preventDefault();

    // Create Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create check mark button
    const completeBtn = document.createElement("button")
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>"
    todoDiv.appendChild(completeBtn);

    // Create trash button
    const trashBtn = document.createElement("button")
    trashBtn.classList.add("trash-btn")
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>"
    todoDiv.appendChild(trashBtn)

    // Add todo to localStorage
    saveLocalTodos(todoInput.value)
    todoList.appendChild(todoDiv)

    todoInput.value="";
}

function deleteCheck(event) {
    const item = event.target;
    // delete todo
    if (item.classList[0] == "trash-btn") {
        const todo = item.parentElement;
        removeLocalTodos(todo)
        // Animation
        todo.classList.add("fall")
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }

    if (item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }

}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;

            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
        // Create Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Create check mark button
        const completeBtn = document.createElement("button")
        completeBtn.classList.add("complete-btn");
        completeBtn.innerHTML = "<i class='fas fa-check'></i>"
        todoDiv.appendChild(completeBtn);

        // Create trash button
        const trashBtn = document.createElement("button")
        trashBtn.classList.add("trash-btn")
        trashBtn.innerHTML = "<i class='fas fa-trash'></i>"
        todoDiv.appendChild(trashBtn)

        todoList.appendChild(todoDiv)
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem("todos", JSON.stringify(todos))

}