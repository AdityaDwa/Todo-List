const addTodo = document.querySelector(".add-todo");
const listContainer = document.querySelector(".list-container");
const todoTypes = document.querySelector(".todo-types");

addTodo.addEventListener("click", createTodo);
listContainer.addEventListener("click", editTodo);
todoTypes.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", retrieveTodo);

function createTodo(event) {
    event.preventDefault();
    let inputTodo = document.querySelector(".input-todo");
    const alerter = document.querySelector(".alerter");

    if (inputTodo.value === "") {
        inputTodo.classList.add("alert-input");
        alerter.innerText = "Please Input Something";
    } else {
        // Creating DIV
        const individualTodo = document.createElement("div");
        individualTodo.classList.add("individual-todo");

        //Creating LI
        const todoText = document.createElement("li");
        todoText.classList.add("todo-text");
        todoText.innerText = inputTodo.value;
        individualTodo.appendChild(todoText);

        //Saving DATA in LOCAL STORAGE
        backupTodo(inputTodo.value);

        //Creating COMPLETED BUTTON
        const completedBtn = document.createElement("button");
        completedBtn.classList.add("completed-btn");
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        individualTodo.appendChild(completedBtn);

        //Creating DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        individualTodo.appendChild(deleteBtn);

        listContainer.appendChild(individualTodo);
        inputTodo.value = "";

        //Clearing ERROR MESSAGE
        inputTodo.classList.remove("alert-input");
        alerter.innerText = "";
    }
}

function editTodo(event) {
    const action = event.target;

    // COMPLETED BTN ACTION
    if (action.classList[0] === "completed-btn") {
        const targetParent = action.parentElement;
        targetParent.classList.toggle("ticked");
    }
    // DELETE BTN ACTION
    if (action.classList[0] === "delete-btn") {
        const targetParent = action.parentElement;
        targetParent.classList.add("remove");
        clearingBackup(targetParent);
        targetParent.addEventListener("transitionend", function (event) {
            targetParent.remove();
        })
    }

}

function filterTodo(event) {
    const allTodos = listContainer.childNodes;

    allTodos.forEach(function (todoDiv) {
        switch (event.target.value) {
            case "all":
                todoDiv.style.display = "flex";
                break;
            case "completed":
                if (todoDiv.classList.contains("ticked")) {
                    todoDiv.style.display = "flex";
                } else {
                    todoDiv.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todoDiv.classList.contains("ticked")) {
                    todoDiv.style.display = "flex";
                } else {
                    todoDiv.style.display = "none";
                }
                break;
        }
    })
}

function backupTodo(storedTodo) {
    let listOfTodo;

    if (localStorage.getItem("todos") === null) {
        listOfTodo = [];
    } else {
        listOfTodo = JSON.parse(localStorage.getItem("todos"));
    }
    listOfTodo.push(storedTodo);
    localStorage.setItem("todos", JSON.stringify(listOfTodo));
}

function retrieveTodo() {
    let listOfTodo;

    if (localStorage.getItem("todos") === null) {
        listOfTodo = [];
    } else {
        listOfTodo = JSON.parse(localStorage.getItem("todos"));
    }
    listOfTodo.forEach(function (storedTodo) {
        // Creating DIV
        const individualTodo = document.createElement("div");
        individualTodo.classList.add("individual-todo");

        //Creating LI
        const todoText = document.createElement("li");
        todoText.classList.add("todo-text");
        todoText.innerText = storedTodo;
        individualTodo.appendChild(todoText);

        //Creating COMPLETED BUTTON
        const completedBtn = document.createElement("button");
        completedBtn.classList.add("completed-btn");
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        individualTodo.appendChild(completedBtn);

        //Creating DELETE BUTTON
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        individualTodo.appendChild(deleteBtn);

        listContainer.appendChild(individualTodo);
    })
}

function clearingBackup(storedTodo) {
    let listOfTodo;

    if (localStorage.getItem("todos") === null) {
        listOfTodo = [];
    } else {
        listOfTodo = JSON.parse(localStorage.getItem("todos"));
    }
    const todoText = storedTodo.children[0].innerText;
    listOfTodo.splice(listOfTodo.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(listOfTodo));
}
