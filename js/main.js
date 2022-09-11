const form = document.querySelector('#form'),
      taskInput = document.querySelector('#taskInput'),
      tasksList = document.querySelector('#tasksList'),
      emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(item => {
    const cssClass = item.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `
        <li id="${item.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${item.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
});

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

checkEmptyList();

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask);

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

    const taskHTML = `
        <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
            <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>
    `;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = '';
    taskInput.focus();

    checkEmptyList();
    saveToLocalStorage();
}

function deleteTask(e) {
    const target = e.target;
    if (target.dataset.action != 'delete') {
        return;
    } else {
        const task = target.closest('li');

        const index = tasks.findIndex(taskid => taskid.id == task.id);

        tasks.splice(index, 1);
        task.remove();
    }

    checkEmptyList();

    saveToLocalStorage();
}

function doneTask(e) {
    const target = e.target;

    if (target.dataset.action != 'done') {
        return;
    } else {
        const task = target.closest('li');
    
        const index = tasks.find(taskid => taskid.id == task.id);
        index.done = !index.done;

        task.classList.add('task-title--done');
    }

    saveToLocalStorage();
}

function checkEmptyList() {
    if (tasks.length == 0) {
        const emptyListEl = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;

        tasksList.insertAdjacentHTML('afterbegin', emptyListEl);
    } else {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}