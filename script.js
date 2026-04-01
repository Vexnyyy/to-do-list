let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "active") return !task.done;
      if (filter === "completed") return task.done;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      if (task.done) li.classList.add("completed");

      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="deleteTask(${index})">✖</button>
      `;

      list.appendChild(li);
    });
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

document.getElementById("toggleMode").onclick = () => {
  document.body.classList.toggle("dark");
};

renderTasks();