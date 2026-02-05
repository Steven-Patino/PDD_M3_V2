async function createTask(event) {
  event.preventDefault();



  const title = document.getElementById("task-title").value.trim();
  const description = document.getElementById("details").value.trim();
  const status = document.getElementById("status").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;
  const category = document.getElementById("category").value;


  if (!title || !status || !priority || !dueDate || !category) {
    alert("Please complete all required fields");
    return;
  }


  const task = {
    title,
    description,
    status,              
    priority,            
    dueDate,
    proyectId: "default",
    assignedTo: "admin",
    category
  };

  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error("Error creating task");
    }
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert("Failed to create task");
  }
}

