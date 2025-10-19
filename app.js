// Todo App - Stores todos in localStorage and syncs with markdown format
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        // Load todos from localStorage
        this.loadTodos();
        
        // Set up event listeners
        document.getElementById('addBtn').addEventListener('click', () => this.addTodo());
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearCompleted());
        
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Initial render
        this.render();
    }

    loadTodos() {
        const saved = localStorage.getItem('todos');
        if (saved) {
            this.todos = JSON.parse(saved);
        } else {
            // Initialize with sample todos from markdown format
            this.todos = [
                { id: Date.now(), text: 'Learn JavaScript basics', completed: false },
                { id: Date.now() + 1, text: 'Build a todo app', completed: false },
                { id: Date.now() + 2, text: 'Practice Git commands', completed: false },
                { id: Date.now() + 3, text: 'Set up development environment', completed: true },
                { id: Date.now() + 4, text: 'Create GitHub repository', completed: true }
            ];
            this.saveTodos();
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.generateMarkdown();
    }

    generateMarkdown() {
        // Generate markdown representation
        const activeTasks = this.todos
            .filter(todo => !todo.completed)
            .map(todo => `- [ ] ${todo.text}`)
            .join('\n');
        
        const completedTasks = this.todos
            .filter(todo => todo.completed)
            .map(todo => `- [x] ${todo.text}`)
            .join('\n');

        const markdown = `# Todo List

## Active Tasks
${activeTasks || '(No active tasks)'}

## Completed Tasks
${completedTasks || '(No completed tasks)'}
`;

        // Store markdown representation (in a real app, this would save to a file)
        localStorage.setItem('todosMarkdown', markdown);
        console.log('Generated Markdown:\n', markdown);
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();
        
        if (text === '') return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
        
        input.value = '';
        input.focus();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }

    clearCompleted() {
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        this.render();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        // Clear list
        todoList.innerHTML = '';

        // Show empty state if no todos
        if (filteredTodos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No tasks to display</div>';
        } else {
            // Render todos
            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                
                li.innerHTML = `
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span>${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn">Delete</button>
                `;

                // Add event listeners
                const checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

                const deleteBtn = li.querySelector('.delete-btn');
                deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

                todoList.appendChild(li);
            });
        }

        // Update stats
        const activeCount = this.todos.filter(t => !t.completed).length;
        document.getElementById('taskCount').textContent = 
            `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
