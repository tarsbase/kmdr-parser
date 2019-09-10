#!/user/bin/env node

import Parser from "../src/parser";
import commander from "commander";

commander.option(
  "-f, --file <filename>",
  "The YAML or JSON file with a kmdr schema"
);
commander.parse(process.argv);

if (commander.file) {
  const parser = new Parser(commander.file);
}
