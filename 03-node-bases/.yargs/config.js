import argv from "yargs";

export default argv(process.argv)
    .options({
        b: {
            alias: "base",
            type: "number",
            demandOption: true,
            describe: "It's the multiplication base",
        },
        l: {
            alias: "list",
            type: "boolean",
            default: false,
            describe: "List the details of the created table",
        },
        t: {
            alias: "to",
            type: "number",
            default: 10,
            describe: "The multiplication table to the number specified",
        },
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw "The base must be a number";
        }

        return true;
    }).argv;

//module.exports = argv;
