let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

tasks.forEach((task, index) => {
  const li = document.createElement("li");

  const taskText = document.createElement("span");
  taskText.textContent = `${index + 1}. ${task.text}`;
    if (task.done) taskText.classList.add("done");
    taskText.classList.add("task-text");
    taskText.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(taskText);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({ text: taskText, done: false });
  saveTasks();
  renderTasks();
  input.value = "";
}

window.onload = renderTasks;
