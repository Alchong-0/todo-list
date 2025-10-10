class Task {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;            // MM/DD/YYYY
        this._priority = priority;          // High, Med, Low
    }

    get title() { return this._title }
    get description() { return this._description }
    get dueDate() { return this._dueDate }
    get priority() { return this._priority }

    set title(value) { this._title = value }
    set description(value) { this._description = value }
    set dueDate(value) { this._dueDate = value }
    set priority(value) { this._priority = value }
}

class Project {
    constructor(name) {
        this._name = name;
        this._taskList = [];
    }

    get name() { return this._name }
    get taskList() { return this._taskList }
    
    set name(value) { this._name = value }
    set taskList(value) { this._taskList = value }

}

export { Task, Project };