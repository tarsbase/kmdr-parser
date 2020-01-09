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

export class Command implements CommandInterface {
  public command: string;
  public summary: string;
  public description?: string;
  public output?: string;
  public ast?: string;

  constructor(newCommand: CommandInterface) {
    const { command, summary, description, output } = newCommand;

    if (SchemaValidator.isEmpty(command)) {
      throw new Error(ERROR_MESSAGES.COMMAND_EXAMPLE_COMMAND_EMPTY);
    } else {
      this.command = command;
    }

    if (SchemaValidator.isEmpty(summary)) {
      throw new Error(ERROR_MESSAGES.COMMAND_EXAMPLE_SUMMARY_EMPTY);
    } else {
      this.summary = summary;
    }
  }
}
