let bgColorsArray = ["#bbd3fa", "#aee8be", "#f2b544", "#ccf0ed", "#dcccf0", "#f0cce1", "#d0f0cc", "#f0edcc"];
let lenOf = bgColorsArray.length;
let index = Math.ceil(Math.random() * lenOf);
if (index === lenOf) {
    index = lenOf - 1;
}
let labelContainerBgColor = bgColorsArray[index];
// bgColo



let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodosButton = document.getElementById("saveTodosButton");


function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();

saveTodosButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteItemIndex, 1);
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    /*
    if(checkboxElement.checked === true){
        labelElement.classList.add("checked");
    }else{
        labelElement.classList.remove("checked");
    }
    */
    labelElement.classList.toggle("checked");

    let todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoItem = todoList[todoItemIndex];

    if (todoItem.isChecked === true) {
        todoItem.isChecked = false;
    } else {
        todoItem.isChecked = true;
    }
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.classList.add("checkbox-input");
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputEl);

    let labelContainerEl = document.createElement("div");
    labelContainerEl.classList.add("label-container", "d-flex", "flex-row");
    labelContainerEl.style.backgroundColor = labelContainerBgColor;
    todoElement.appendChild(labelContainerEl);

    let labelEl = document.createElement("label");
    labelEl.id = labelId;
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = todo.text;
    labelEl.setAttribute("for", checkboxId);
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelContainerEl.appendChild(labelEl);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainerEl.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let todosCount = todoList.length;
    todosCount = todosCount + 1;

    let userInputValue = document.getElementById("todoUserInput").value;
    if (userInputValue === '') {
        alert("Enter Valid Input..");
        return;
    }

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);

    createAndAppendTodo(newTodo);
    userInputValue.value = "";

}

addTodoButton.onclick = function() {
    onAddTodo();
};