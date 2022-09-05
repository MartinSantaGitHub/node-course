import inquirer from "inquirer";
import colors from "colors";

const questions = [
    {
        type: "list",
        name: "option",
        message: "What do you want to do?",
        choices: [
            {
                value: 1,
                name: `${"1.".green} Search city`,
            },
            {
                value: 2,
                name: `${"2.".green} History`,
            },
            {
                value: 0,
                name: `${"0.".green} Exit`,
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.log("========================".green);
    console.log("   Choose and option   ".white);
    console.log("========================\n".green);

    const { option } = await inquirer.prompt(questions);

    return option;
};

const pause = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Press ${"ENTER".green} to continue`,
        },
    ];

    console.log("\n");

    await inquirer.prompt(question);
};

const readInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "description",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Please, enter a value";
                }

                return true;
            },
        },
    ];

    const { description } = await inquirer.prompt(question);

    return description;
};

const listPlaces = async (places = []) => {
    const choices = places.map((place, idx) => {
        return {
            value: place.id,
            name: `${(++idx).toString().green}. ${place.name}`,
        };
    });

    choices.unshift({
        value: 0,
        name: "0.".green + "Cancel",
    });

    const questions = [
        {
            type: "list",
            name: "id",
            message: "Select place:",
            choices,
        },
    ];

    const { id } = await inquirer.prompt(questions);

    return id;
};

const confirmMessage = async (message) => {
    const question = {
        type: "confirm",
        name: "ok",
        message,
    };

    const { ok } = await inquirer.prompt(question);

    return ok;
};

const listTasksCheckList = async (tasks = []) => {
    const choices = tasks.map((task, idx) => {
        return {
            value: task.id,
            name: `${(++idx).toString().green}. ${task.description}`,
            checked: task.completedAt || false,
        };
    });

    const question = [
        {
            type: "checkbox",
            name: "ids",
            message: "Selects",
            choices,
        },
    ];

    const { ids } = await inquirer.prompt(question);

    return ids;
};

export {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirmMessage,
    listTasksCheckList,
};
