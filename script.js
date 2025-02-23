const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'flex items-center justify-between border rounded p-2';
        listItem.innerHTML = `
            <span class="${task.completed ? 'line-through' : ''} flex-grow">${task.text}</span>
            <div>
                <button onclick="editTask(${index})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-1">Editar</button>
                <button onclick="toggleComplete(${index})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-1">Concluir</button>
                <button onclick="deleteTask(${index})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Excluir</button>
            </div>
        `;
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        renderTasks();
    }
}

function editTask(index) {
    const taskSpan = taskList.children[index].querySelector('span');
    const taskText = tasks[index].text;
    const input = document.createElement('input');
    input.value = taskText;
    input.className = 'flex-grow border rounded p-2';
    taskSpan.replaceWith(input);
    input.focus();
    input.addEventListener('blur', () => {
        tasks[index].text = input.value.trim();
        updateLocalStorage();
        renderTasks();
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener('click', addTask);
renderTasks();