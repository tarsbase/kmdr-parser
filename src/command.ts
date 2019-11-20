/**
 * Copyright 2019 Eddie Ramirez
 */

import { CommandInterface } from "./interfaces";
import { SchemaValidator } from "./schemaValidator";

const ERROR_MESSAGES = {
  COMMAND_EXAMPLE_COMMAND_EMPTY: "Command example cannot be an empty string",
  COMMAND_EXAMPLE_SUMMARY_EMPTY:
    "Command example summary cannot be an empty string"
};

export class Command extends SchemaValidator implements CommandInterface {
  public command: string;
  public summary: string;
  public description?: string;
  public output?: string;

  constructor(newCommand: CommandInterface) {
    super();
    const { command, summary, description, output } = newCommand;

    if (super.isEmpty(command)) {
      throw new Error(ERROR_MESSAGES.COMMAND_EXAMPLE_COMMAND_EMPTY);
    } else {
      this.command = command;
    }

    if (super.isEmpty(summary)) {
      throw new Error(ERROR_MESSAGES.COMMAND_EXAMPLE_SUMMARY_EMPTY);
    } else {
      this.summary = summary;
    }
  }
}
