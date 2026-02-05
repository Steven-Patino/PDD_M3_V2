const API_TASKS = "http://localhost:3000/tasks";
const list = document.getElementById("task-list");
const user = JSON.parse(localStorage.getItem("user"));

// Guard básico
if (!user) {
  window.location.href = "login.html";
}

async function loadTasks() {
  try {
    const res = await fetch(API_TASKS);
    if (!res.ok) throw new Error("Cannot download tasks");

    const tasks = await res.json();

    // 🔥 FILTRO CLAVE: solo tareas del usuario
    const userTasks = tasks.filter(
      task => task.assignedTo === user.name
    );

    list.innerHTML = "";

    if (userTasks.length === 0) {
      list.innerHTML = `
        <tr>
          <td colspan="5" class="p-4 text-center text-gray-500">
            You have no assigned tasks
          </td>
        </tr>
      `;
      return;
    }

    userTasks.forEach(task => {
      const tr = document.createElement("tr");
      tr.className = "border-t hover:bg-gray-50";

      tr.innerHTML = `
        <td class="p-3">
          <input type="checkbox">
        </td>

        <td class="p-3 font-medium">
          ${task.title}
        </td>

        <td class="p-3 text-gray-500">
          ${task.category || "general"}
        </td>

        <td class="p-3 capitalize">
          <span class="${
            task.priority === "high"
              ? "text-red-600"
              : task.priority === "medium"
              ? "text-yellow-600"
              : "text-green-600"
          }">
            ${task.priority}
          </span>
        </td>

        <td class="p-3 capitalize">
          <span class="${
            task.status === "complete"
              ? "text-green-600"
              : task.status === "in-progress"
              ? "text-blue-600"
              : "text-gray-500"
          }">
            ${task.status}
          </span>
        </td>
      `;

      list.appendChild(tr);
    });

  } catch (error) {
    console.error(error);
    alert("Error loading tasks");
  }
}

loadTasks();
