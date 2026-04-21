let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;

  if (!text) return;

  tasks.push({
    id: Date.now(),
    text,
    done: false,
    date
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";

  save();
  render();
}

function setFilter(f) {
  filter = f;
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? {...t, done: !t.done} : t
  );
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filtered = tasks.filter(t => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  filtered.forEach(task => {
    const li = document.createElement("li");

    const top = document.createElement("div");
    top.className = "top";

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.classList.add("done");

    span.onclick = () => toggleTask(task.id);

    const del = document.createElement("button");
    del.textContent = "X";
    del.className = "delete";
    del.onclick = () => deleteTask(task.id);

    top.appendChild(span);
    top.appendChild(del);

    li.appendChild(top);

    if (task.date) {
      const dateEl = document.createElement("div");
      dateEl.className = "date";
      dateEl.textContent = formatDate(task.date);
      li.appendChild(dateEl);
    }

    list.appendChild(li);
  });
}

render();

