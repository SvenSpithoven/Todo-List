const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoListItems = document.querySelector(".todo-list");

//Observaties
// 1. Dit is een hele lange functie, kan dat kleiner?
// Even opschrijven wat het doet: leegt de UL, gaat de tasks halen en blokkeert tot de Tasks er zijn. Voor elke taak een DOMnode (HTML) aanmaken, toevoegen van die DOMnodes aan de DOM met appendChild.

const addTasksToDom = async function () {
  todoListItems.innerHTML = "";
  const tasks = await getTasks();
  console.log("tasks", tasks);

  //3. regel 15 tot 33 hebben een hele duidelijke aparte taak, namelijk het maken van de HTML elementen
  tasks.forEach((task) => {
    let listItem = document.createElement("li");

    // TODO: Input vervangen door checkbox

    //4. Ik kan je even een andere manier laten zien om dit te doen, zie insertAdjacentHTML van Niels
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "image");
    checkbox.setAttribute("src", "images/unchecked.svg");
    checkbox.setAttribute("class", "checkbox");
    checkbox.addEventListener("click", () => {
      putTask(task);
    });

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
// 2. hier kan je nog een event.preventdefault() gebruiken zodat de pagina niet automatisch herlaadt bij het submitten van een form
todoForm.addEventListener("submit", () => {
  postTask(todoInput.value);
});
