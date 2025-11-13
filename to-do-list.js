
function createTaskElement(text, isCompleted) {
    const listItem = document.createElement('li');
    
    if (isCompleted) {
        listItem.classList.add('completed');
    }

    // Task text span
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = 'task-text';
    taskTextSpan.textContent = text;
    listItem.appendChild(taskTextSpan);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '&#10006;'; // Unicode 'X' symbol
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
}

// --- LOCAL STORAGE FUNCTIONS ---

function saveTasks() {
    // Get all list items
    const tasks = [];
    taskList.querySelectorAll('li').forEach(listItem => {
        tasks.push({
            text: listItem.querySelector('.task-text').textContent,
            completed: listItem.classList.contains('completed')
        });
    });

    // Save the array as a JSON string
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

/**
 * Loads tasks from Local Storage and displays them.
 */
function loadTasks() {
    const storedTasks = localStorage.getItem('todoTasks');
    
    if (storedTasks) {
        // Parse the JSON string back into a JavaScript array
        const tasks = JSON.parse(storedTasks);
        
        // Loop through the array and create elements for each task
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}