document.addEventListener("DOMContentLoaded", function() {
    const addTodoButton = document.getElementById("addTodo");
    const newTodoInput = document.getElementById("newTodo");
    const todoList = document.getElementById("todos");
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    // Load stored todos when the page loads
    todos.forEach(todoText => {
        addTodoElement(todoText);
    });

    addTodoButton.addEventListener("click", function() {
        addTodo();
    });

    newTodoInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    function addTodo() {
        const todoText = newTodoInput.value.trim();

        if (todoText !== "") {
            todos.push(todoText);
            localStorage.setItem("todos", JSON.stringify(todos));
            addTodoElement(todoText);
            newTodoInput.value = "";
        }
    }

    function addTodoElement(todoText) {
        const newTodo = document.createElement("li");
        newTodo.className = "todo";
        
        // Create and append a span element for the todo text
        const todoSpan = document.createElement("span");
        todoSpan.textContent = todoText;
        newTodo.appendChild(todoSpan);

        // Create and append an input element for editing
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = todoText;
        editInput.className = "edit";
        editInput.style.display = "none";
        newTodo.appendChild(editInput);

        const removeButton = document.createElement("button");
        removeButton.className = "remove-todo";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", function() {
            const index = todos.indexOf(todoText);
            if (index !== -1) {
                todos.splice(index, 1);
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            newTodo.remove();
        });

        const editButton = document.createElement("button");
        editButton.className = "edit-todo";
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            // Toggle between displaying the todo text and the edit input
            todoSpan.style.display = "none";
            editInput.style.display = "inline-block";
            editInput.focus(); // Focus on the input field
        });

        // When editing is finished, update the todo text and toggle visibility
        editInput.addEventListener("blur", function() {
            todoSpan.textContent = editInput.value;
            todoSpan.style.display = "inline-block";
            editInput.style.display = "none";
            const index = todos.indexOf(todoText);
            if (index !== -1) {
                todos[index] = editInput.value;
                localStorage.setItem("todos", JSON.stringify(todos));
            }
        });

        newTodo.addEventListener("mouseenter", function() {
            removeButton.style.display = "inline-block";
            editButton.style.display = "inline-block";
        });

        newTodo.addEventListener("mouseleave", function() {
            removeButton.style.display = "none";
            editButton.style.display = "none";
        });
        
        const Button = document.createElement("span");
        Button.appendChild(editButton);
        Button.appendChild(removeButton);

        newTodo.appendChild(Button);
        todoList.appendChild(newTodo);
    }
});
