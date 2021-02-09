// Tips & Tricks API-client
// 1. De BASE_URL in een constante zetten. Als het endpoint verandert hoef je het maar op 1 plek aan te passen.

const getTasks = async () => {
  const response = await fetch(
    "https://todolistsven-default-rtdb.firebaseio.com/tasks.json",
    {
      method: "GET",
    }
  );
  const responseJSON = await response.json();

  console.log("before:", responseJSON);
  let tasks = Object.keys(responseJSON).map((key) => ({
    id: key,
    description: responseJSON[key].description,
    done: responseJSON[key].done,
  }));
  console.log("After the tasks array", tasks);
  return tasks;
};

const postTask = async (task) => {
  console.log("task", task);
  await fetch("https://todolistsven-default-rtdb.firebaseio.com/tasks.json", {
    method: "POST",
    body: JSON.stringify({ description: task, done: false }),
  });
};

const deleteTask = async (task) => {
  await fetch(
    `https://todolistsven-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
    {
      method: "DELETE",
    }
  );
  addTasksToDom();
};

const putTask = async (task) => {
  console.log("task", task);

  if (task.done == false) {
    await fetch(
      `https://todolistsven-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
      {
        method: "PUT",
        // 2. wanneer je "done:true" verandert in "done: task.done", hoef je hier geen if statement te maken --> deze logica van het false/true maken kan naar de andere file
        body: JSON.stringify({ description: task.description, done: true }),
      }
    );
  } else {
    await fetch(
      `https://todolistsven-default-rtdb.firebaseio.com/tasks/${task.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ description: task.description, done: false }),
      }
    );
  }
  //3. hier de call maken naar addTasksToDom() is niet fout, alleen niet zo logisch in een functie die "putTask" heet. Je verwacht dat de functie de tasks put en verder niet. #spaghetti
  addTasksToDom();
};
