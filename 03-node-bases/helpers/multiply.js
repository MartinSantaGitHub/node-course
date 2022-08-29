//const fs = require("fs");
import fs from "fs";
import colors from "colors";

const createTableFile = async (base, to, verbose = false) => {
    const file = `./output/table-${base}.txt`;
    let outputPrint = "";
    let output = "";

    for (let i = 1; i <= to; i++) {
        outputPrint += `${base} ${colors.green("X")} ${i} ${
            "=".bold.red
        } ${colors.magenta(base * i)}\n`;
        output += `${base} X ${i} = ${base * i}\n`;
    }

    if (verbose) {
        console.log("=============================".blue);
        console.log("Multiply Table:", base);
        console.log("=============================".blue);
        console.log(outputPrint);
    }

    fs.writeFileSync(file, output);

    return file;
};

export default createTableFile;

// module.exports = {
//     createTableFile,
// };
