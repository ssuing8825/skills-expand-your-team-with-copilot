# Todo App

A simple, elegant todo application with markdown-based storage.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks
- ✅ Filter tasks (All, Active, Completed)
- ✅ Clear all completed tasks
- ✅ Persistent storage using localStorage
- ✅ Automatic markdown format generation
- ✅ Responsive design with modern UI

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `app.js` - Todo app logic and functionality
- `todos.md` - Sample markdown file showing the todo format

## How to Use

1. Open `index.html` in your web browser, or serve it with a local web server:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

2. Add tasks by typing in the input field and clicking "Add" or pressing Enter

3. Check the checkbox to mark tasks as complete

4. Click "Delete" to remove a task

5. Use the filter buttons to view All, Active, or Completed tasks

6. Click "Clear Completed" to remove all completed tasks

## Markdown Format

The app generates todos in markdown format (visible in browser console):

```markdown
# Todo List

## Active Tasks
- [ ] Task 1
- [ ] Task 2

## Completed Tasks
- [x] Completed task 1
- [x] Completed task 2
```

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- LocalStorage API
