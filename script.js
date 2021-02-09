const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoListItems = document.querySelector(".todo-list");

const addTasksToDom = async function () {
  todoListItems.innerHTML = "";
  const tasks = await getTasks();
  console.log("tasks", tasks);

  tasks.forEach((task) => {
    let listItem = document.createElement("li");

    // TODO: Input vervangen door checkbox
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "image");
    checkbox.setAttribute("src", "images/unchecked.svg");
    checkbox.setAttribute("class", "checkbox");
    checkbox.addEventListener("click", () => putTask(task));

    let description = document.createElement("p");
    description.innerHTML = task.description;

    let removeTask = document.createElement("input");
    removeTask.setAttribute("type", "image");
    removeTask.setAttribute("src", "images/delete.svg");
    removeTask.setAttribute("class", "remove-btn");
    removeTask.addEventListener("click", () => deleteTask(task));

    // TODO: src verplaatsen naar css (door middel van classList.toggle wisselen)
    if (task.done == true) {
      listItem.classList.toggle("checked");
      checkbox.setAttribute("src", "images/checked.svg");
    }

    listItem.appendChild(checkbox);
    listItem.appendChild(description);
    listItem.appendChild(removeTask);

    todoListItems.appendChild(listItem);
  });
};

addTasksToDom();
todoForm.addEventListener("submit", () => postTask(todoInput.value));
