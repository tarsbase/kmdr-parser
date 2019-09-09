#!/user/bin/env node

import Parser from "../";
import commander from "commander";

commander.option("-f, --file <filename>", "output extra debugging");
commander.parse(process.argv);

if (commander.file) {
  const parser = new Parser(commander.file);
}
