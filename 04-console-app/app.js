//import { pause, showMenu } from "./helpers/messages.js";
import {
    inquirerMenu,
    getTaskToDelete,
    pause,
    readInput,
    confirmMessage,
    listTasksCheckList,
} from "./helpers/inquirer.js";
import { readDB, saveDB } from "./helpers/manageDB.js";
import Tasks from "./models/tasks.js";

const main = async () => {
    const tasksDB = readDB();
    const tasks = new Tasks(tasksDB);
    let opt = "";

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case "1":
                const description = await readInput("Description:");

                tasks.createTask(description);
                break;
            case "2":
                tasks.showList();
                break;
            case "3":
                tasks.showList({ completed: true });
                break;
            case "4":
                tasks.showList({ completed: false });
                break;
            case "5":
                const currentIds = tasks.list
                    .filter((task) => task.completedAt)
                    .map((task) => task.id);
                const ids = await listTasksCheckList(tasks.list);
                const isSameIds =
                    currentIds.length === ids.length &&
                    currentIds.every((e) => ids.includes(e));

                if (!isSameIds) tasks.toggleCompleted(ids);

                break;
            case "6":
                const id = await getTaskToDelete(tasks.list);

                if (id !== "0") {
                    const ok = await confirmMessage("Are you sure?");

                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("Task deleted!");
                    }
                }

                break;
        }

        if (tasks.isDbChanged) {
            saveDB(tasks.list);

            tasks.isDbChanged = false;
        }

        if (opt !== "0") await pause();
    } while (opt !== "0");
};

main();
