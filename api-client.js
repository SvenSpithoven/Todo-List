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

  addTasksToDom();
};
