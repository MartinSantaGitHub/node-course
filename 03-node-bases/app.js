//const { createTableFile } = require("./helpers/multiply");
import createTableFile from "./helpers/multiply.js";
import args from "./.yargs/config.js";
import colors from "colors";

console.clear();

createTableFile(args.b, args.t, args.l)
    .then((fileName) => console.log(fileName.rainbow, "created!"))
    .catch((err) => console.log(err));
