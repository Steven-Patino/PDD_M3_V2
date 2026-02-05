const API_EVENTS = "http://localhost:3000/tasks";
const list = document.getElementById("task-list");
const user = JSON.parse(localStorage.getItem("user"));


if (user?.role === "user") {
  window.location.href = "mytasks.html";
}


async function loadTasksDashboard() {
  try {
    const res = await fetch(API_EVENTS);
    if (!res.ok) throw new Error("Cannot download tasks");

    const tasks = await res.json();
    list.innerHTML = "";


    if (tasks.length === 0) {
      list.innerHTML = `
        <tr>
          <td colspan="6" class="p-4 text-center text-gray-500">
            There are no active tasks
          </td>
        </tr>
      `;
      return;
    }


    tasks.forEach(task => {
      const tr = document.createElement("tr");
      tr.className = "border-t";

      tr.innerHTML = `
        <td class="p-2">${task.title}</td>
        <td class="p-2">${task.assignedTo}</td>
        <td class="p-2">${task.status}</td>
        <td class="p-2">${task.priority}</td>
        <td class="p-2">${task.dueDate}</td>
        <td class="p-2 space-x-2">
          <button class="edit-btn text-blue-600" data-id="${task.id}">🖊️</button>
          <button class="delete-btn text-red-600" data-id="${task.id}">🗑️</button>
        </td>
      `;

      list.appendChild(tr);
    });

  } catch (error) {
    alert("Error loading tasks");
    console.error(error);
  }
}


list.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("delete-btn")) {
    await deleteTask(id);
  }

  if (e.target.classList.contains("edit-btn")) {
    window.location.href = `edittask.html?id=${id}`;
  }
});


async function deleteTask(id) {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    const res = await fetch(`${API_EVENTS}/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) throw new Error("Error deleting task");

    loadTasks(); 
  } catch (error) {
    alert("Could not delete task");
    console.error(error);
  }
}


loadTasksDashboard();

