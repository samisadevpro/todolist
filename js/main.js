document.addEventListener("DOMContentLoaded", function() {
    // Select relevant elements
    const addTaskButton = document.getElementById('add-task-button');
    const newTopicInput = document.getElementById('new-topic');
    const newParagraphInput = document.getElementById('new-paragraph');
    const todoList = document.getElementById('todo-list');
    const container = document.querySelector('.container');

    // Array of colors for sticky notes
    const colors = ['#ffeb3b', '#ffd54f', '#ffcc80', '#ffab91', '#f48fb1'];
    let colorIndex = 0; // Start with the first color

    // Default background color
    const defaultColor = '#ffeb3b';
    container.style.backgroundColor = defaultColor;
    document.body.style.backgroundColor = defaultColor;

    let taskCount = 0; // Initialize task count

    // Event listener for the "Add Task" button
    addTaskButton.addEventListener('click', function() {
        const topicText = newTopicInput.value.trim();
        const paragraphText = newParagraphInput.value.trim();
        if (topicText !== '' && paragraphText !== '') {
            addTask(topicText, paragraphText);
            newTopicInput.value = ''; // Clear input fields
            newParagraphInput.value = '';
            newTopicInput.focus(); // Focus on topic input
        }
    });

    // Function to add a new task
    function addTask(topicText, paragraphText) {
        const li = document.createElement('li'); // Create a new list item
        const color = colors[colorIndex]; // Get the current color

        li.style.backgroundColor = color; // Set background color of the list item
        container.style.backgroundColor = color; // Set background color of the container
        document.body.style.backgroundColor = color; // Optionally set background color of the body

        colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors

        taskCount++; // Increment task count

        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';

        // Create custom checkbox
        const customCheckbox = document.createElement('label');
        customCheckbox.className = 'custom-checkbox';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const customSpan = document.createElement('span');

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                li.classList.add('completed'); // Mark task as completed
                todoList.appendChild(li); // Move task to end of the list
            } else {
                li.classList.remove('completed'); // Unmark task as completed
            }
        });

        customCheckbox.appendChild(checkbox);
        customCheckbox.appendChild(customSpan);

        // Create task text container
        const taskTextContainer = document.createElement('div');
        taskTextContainer.className = 'task-text';

        const topicSpan = document.createElement('span');
        topicSpan.textContent = topicText;
        topicSpan.style.fontWeight = 'bold';
        topicSpan.style.display = 'block';

        const paragraphSpan = document.createElement('span');
        paragraphSpan.textContent = paragraphText;
        paragraphSpan.style.display = 'block';

        taskTextContainer.appendChild(topicSpan);
        taskTextContainer.appendChild(paragraphSpan);

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Font Awesome trash icon
        deleteButton.addEventListener('click', function() {
            li.classList.add('fade-out'); // Add fade-out effect
            setTimeout(() => {
                li.remove(); // Remove task from the list
                if (todoList.children.length === 0) {
                    container.style.backgroundColor = defaultColor; // Revert to default color
                    document.body.style.backgroundColor = defaultColor; // Optionally revert body color
                }
            }, 500); // Delay to match the CSS transition
        });

        // Create time and date display
        const timeDateSpan = document.createElement('span');
        timeDateSpan.className = 'time-date';
        timeDateSpan.textContent = new Date().toLocaleString();

        // Create task number display
        const numberSpan = document.createElement('span');
        numberSpan.className = 'task-number';
        numberSpan.textContent = taskCount + '.'; // Display task number

        taskContainer.appendChild(numberSpan);
        taskContainer.appendChild(customCheckbox);
        taskContainer.appendChild(taskTextContainer);
        li.appendChild(taskContainer);
        li.appendChild(deleteButton);
        li.appendChild(timeDateSpan);

        todoList.appendChild(li); // Add the new task to the list
    }
});
