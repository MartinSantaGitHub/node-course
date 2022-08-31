import colors from "colors";
import { rejects } from "node:assert";
import * as readline from "node:readline";

const showMenu = () => {
    return new Promise((resolve) => {
        console.clear();
        console.log("========================".green);
        console.log("   Choose and option   ".green);
        console.log("========================\n".green);

        console.log(`${"1.".green} Create Task`);
        console.log(`${"2.".green} List Tasks`);
        console.log(`${"3.".green} List Completed Tasks`);
        console.log(`${"4.".green} List Pending Tasks`);
        console.log(`${"5.".green} Complete Task(s)`);
        console.log(`${"6.".green} Delete Task`);
        console.log(`${"0.".green} Exit\n`);

        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question("Select an option: ", (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
};

const pause = () => {
    return new Promise((resolve) => {
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readLine.question(`\nPress ${"ENTER".green} to continue\n`, (opt) => {
            readLine.close();
            resolve();
        });
    });
};

export { showMenu, pause };
