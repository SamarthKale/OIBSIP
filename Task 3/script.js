let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (!text) {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.push(task);
    saveTasks();
    input.value = "";
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = "task-card";

        const details = document.createElement("div");
        details.className = "task-details";

        const title = document.createElement("div");
        title.className = "task-title";
        title.innerText = task.text;

        const time = document.createElement("div");
        time.className = "task-time";
        time.innerText = "Added: " + task.createdAt;

        details.appendChild(title);
        details.appendChild(time);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        if (!task.completed) {
            const completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.innerText = "✔";
            completeBtn.onclick = () => completeTask(task.id);
            actions.appendChild(completeBtn);
        }

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.innerText = "✏";
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.innerText = "🗑";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(details);
        li.appendChild(actions);

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }
    });
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = true;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);

    if (newText && newText.trim()) {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

renderTasks();
