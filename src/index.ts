/**
 * Copyright 2019 Eddie Ramirez
 */

import { Command } from "./command";
import {
  CommandInterface,
  OptionSchema,
  ProgramSchema,
  SubcommandSchema
} from "./interfaces";
import { Option } from "./option";
import { Parser } from "./parser";
import { Program } from "./program";
import Schema from "./schema";
import { Subcommand } from "./subcommand";

export {
  Command,
  CommandInterface,
  Parser,
  Program,
  Option,
  Subcommand,
  OptionSchema,
  ProgramSchema,
  SubcommandSchema
};

export default Schema;
