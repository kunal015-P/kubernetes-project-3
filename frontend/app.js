const API_URL = "/api"; // important (K8s service name)

async function fetchTasks() {
    const res = await fetch(`${API_URL}/tasks`);
    const data = await res.json();

    const list = document.getElementById("taskList");
    list.innerHTML = "";

    data.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.name;
        list.appendChild(li);
    });
}

async function addTask() {
    const input = document.getElementById("taskInput");

    await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: input.value })
    });

    input.value = "";
    fetchTasks();
}

fetchTasks();