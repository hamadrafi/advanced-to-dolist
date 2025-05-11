document.addEventListener("DOMContentLoaded", () => {
  const storedtask = JSON.parse(localStorage.getItem("tasks"));

  if (storedtask) {
    storedtask.forEach((task) => tasks.push(task));
    updateTaskList();
  }
});

let tasks = [];

//Saving to Storage
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

//Adding Task
const addtask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = "";
    updateTaskList();
    updatestats();
    saveTask();
  }
};
const ToggletastComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updatestats();
  saveTask();
};
const delTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  saveTask();
  updatestats();
};
const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTaskList();
  updatestats();
  saveTask();
};

const updatestats = () => {
  const completedtask = tasks.filter((task) => task.completed).length;
  const totaltask = tasks.length;
  if (totaltask === 0) {
    document.getElementById("progress").style.width = "0%";
    document.getElementById("numbers").innerHTML = "0 / 0";
  } else {
    const progress = (completedtask / totaltask) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.display = "block";
    progressBar.style.width = `${progress}%`;

    document.getElementById(
      "numbers"
    ).innerHTML = `${completedtask} / ${totaltask}`;
    if (tasks.length && completedtask === totaltask) {
      blastConfeti();
    }
  }
};
//Updating Task List
const updateTaskList = () => {
  const tasklist = document.getElementById("tasklist");
  tasklist.innerHTML = "";

  tasks.forEach((task, index) => {
    const listitem = document.createElement("li");
    listitem.innerHTML = `
         <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                  task.completed ? "checked" : ""
                }>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="img/edit.png" alt="edit.png" onClick="editTask(${index})">
                <img src="img/bin.png" alt="bin.png"  onClick="delTask(${index})">
            </div>
        </div>
        `;
    listitem.addEventListener("change", () => ToggletastComplete(index));
    tasklist.append(listitem);
  });
};

document.getElementById("newtask").addEventListener("click", function (e) {
  e.preventDefault();
  addtask();
});

const blastConfeti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
