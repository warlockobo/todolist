export class Todo {
    constructor(title, description = '', dueDate = null, priority = 'medium', notes = '', checklist = []) {
        this.id = Date.now() + Math.random(); // Simple unique ID
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; // 'low', 'medium', 'high'
        this.notes = notes;
        this.checklist = checklist; // Array of checklist items
        this.completed = false;
        this.createdAt = new Date();
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    addChecklistItem(item) {
        this.checklist.push({ text: item, completed: false });
    }

    toggleChecklistItem(index) {
        if (this.checklist[index]) {
            this.checklist[index].completed = !this.checklist[index].completed;
        }
    }

    isOverdue() {
        if (!this.dueDate) return false;
        return new Date() > new Date(this.dueDate) && !this.completed;
    }
} 