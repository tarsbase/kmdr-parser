#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const parser_1 = __importDefault(require("../src/parser"));
// tslint:disable-next-line: no-var-requires
const pkg = require("../../package.json");
let allFiles = [];
commander_1.default
    .version(pkg.version, "-v, --version", "out the current version")
    .option("-s, --summary", "Show a summary of subcommands and options in a schema")
    // .option("-w, --warnings", "Show validation warnings")
    .arguments("<file> [files...]")
    .action((file, files) => {
    if (file === "") {
        console.error("Provide a schema file in JSON or YAML format");
    }
    else {
        allFiles = [file, ...files];
    }
});
commander_1.default.parse(process.argv);
const options = {
    showStats: commander_1.default.summary,
    showWarnings: commander_1.default.warnings
};
for (const file of allFiles) {
    try {
        const parser = new parser_1.default(file, options);
        const schema = parser.parse();
        console.log(`The program schema ${file} is valid!`);
        if (options.showStats) {
            console.log(schema.summary());
        }
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=index.js.map