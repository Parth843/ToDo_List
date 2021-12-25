// Selectors
const todoInput = document.getElementById("input-el");
const todoBtn = document.getElementById("inputbtn-el");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

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

    todoList.appendChild(todoDiv)

    todoInput.value="";
}

function deleteCheck(event) {
    const item = event.target;
    // delete todo
    if (item.classList[0] == "trash-btn") {
        const todo = item.parentElement;
        todo.remove();
    }
}