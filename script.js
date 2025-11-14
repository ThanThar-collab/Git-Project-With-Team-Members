// Get DOM elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

// --- INITIAL LOAD ---
// Load tasks from Local Storage when the page loads
//document.addEventListener('DOMContentLoaded', loadTasks);

// --- EVENT LISTENERS ---
addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
taskList.addEventListener('click', handleTaskActions); // Single listener for all list item clicks

// --- CORE FUNCTIONS ---

/* Handles clicks on the task list container.
 * This is more efficient than adding listeners to every task item.
 */
function handleTaskActions(e) {
    const target = e.target;
    const listItem = target.closest('li'); // Find the nearest parent <li>

    if (!listItem) return; // If clicked outside an <li>

    if (target.classList.contains('delete-btn')) {
        // Handle Delete Button Click
        listItem.remove();
        saveTasks();
    } else {
        // Handle Task Text Click (Toggle Complete)
        listItem.classList.toggle('completed');
        saveTasks();
    }
}

/* Creates and appends a new task item to the list.
 */
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Call the function to create the actual task element
    createTaskElement(taskText, false); 
    
    // Clear input and save
    taskInput.value = '';
    saveTasks();
}