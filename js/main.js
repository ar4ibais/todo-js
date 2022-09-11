// Находим элементы на странице
const form = document.querySelector('#form'),
      taskInput = document.querySelector('#taskInput'),
      tasksList = document.querySelector('#tasksList'),
      emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);

//Добавление задачи
function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;

    const taskHTML = `
        <li class="list-group-item d-flex justify-content-between task-item">
            <span class="task-title">${taskText}</span>
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

    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
}