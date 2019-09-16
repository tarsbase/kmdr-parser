#!/usr/bin/env node

import commander from "commander";
import { Parser } from "../src/parser";
// tslint:disable-next-line: no-var-requires
const pkg = require("../../package.json");

let allFiles: string[] = [];

commander
  .version(pkg.version, "-v, --version", "out the current version")
  .option(
    "-s, --summary",
    "Show a summary of subcommands and options in a schema"
  )
  // .option("-w, --warnings", "Show validation warnings")
  .arguments("<file> [files...]")
  .action((file, files) => {
    if (file === "") {
      console.error("Provide a schema file in JSON or YAML format");
    } else {
      allFiles = [file, ...files];
    }
  });

commander.parse(process.argv);

const options = {
  showStats: commander.summary,
  showWarnings: commander.warnings
};

for (const file of allFiles) {
  try {
    const parser = new Parser(file, options);
    const schema = parser.parse();
    console.log(`The program schema ${file} is valid!`);
    if (options.showStats) {
      console.log(schema.summary());
    }
  } catch (err) {
    console.error(err);
  }
}
