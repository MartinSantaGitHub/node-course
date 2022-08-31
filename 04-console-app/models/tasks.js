import Task from "./task.js";

export default class Tasks {
    #list;
    #isDbChanged;

    constructor(data) {
        this.#list = data ?? [];
    }

    #listTasks(data, isDate = false) {
        console.log();

        data.forEach((task, idx) => {
            const { description, completedAt } = task;
            const status = completedAt
                ? isDate
                    ? completedAt.green
                    : "Completed".green
                : "Pending".red;
            console.log(
                `${
                    ((++idx).toString() + ".").green
                } ${description} :: ${status}`
            );
        });
    }

    showList({ completed = null } = {}) {
        let data;
        let isDate;

        if (completed) {
            data = this.list.filter((task) => task.completedAt);
            isDate = true;
        } else if (completed === false) {
            data = this.list.filter((task) => !task.completedAt);
        } else {
            data = this.list;
        }

        this.#listTasks(data, isDate);
    }

    get list() {
        return this.#list;
    }

    get isDbChanged() {
        return this.#isDbChanged;
    }

    set isDbChanged(value) {
        this.#isDbChanged = value;
    }

    createTask(description = "") {
        this.#list.push(new Task(description));
        this.#isDbChanged = true;
    }

    deleteTask(id) {
        this.#list = this.#list.filter((task) => task.id !== id);
        this.#isDbChanged = true;
    }

    getTask(id) {
        return this.#list.find((task) => task.id === id);
    }

    toggleCompleted(ids = []) {
        this.#list = this.#list.map((task) => {
            if (ids.includes(task.id)) {
                task.completedAt =
                    task.completedAt ?? new Date().toLocaleString();
            } else {
                task.completedAt = null;
            }

            return task;
        });

        this.#isDbChanged = true;
    }
}
