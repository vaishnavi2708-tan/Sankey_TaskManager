let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
            <li>
                <span style="color: ${task.done ? 'green' : 'black'};">
                    ${task.text}
                </span>

                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </li>
        `;
    });

    // Update counts
    document.getElementById("totalTasks").innerText = "Total Tasks: " + tasks.length;

    const completedCount = tasks.filter(task => task.done).length;
    document.getElementById("completedTasks").innerText = "Completed Tasks: " + completedCount;

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, done: false });
    input.value = "";
    checkInput();   
    showTasks();
}

function completeTask(index) {
    tasks[index].done = true;
    showTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    showTasks();
}

function checkInput() {
    const input = document.getElementById("taskInput");
    const button = document.getElementById("addBtn");

    button.disabled = input.value.trim() === "";
}

showTasks();
