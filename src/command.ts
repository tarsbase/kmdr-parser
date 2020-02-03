/**
 * Copyright 2019 Eddie Ramirez
 */

import { CommandSchema } from "./interfaces";
import { ERROR_MESSAGES } from "./contants";
import SchemaValidator from "./schemaValidator";
import log4js from "log4js";
import { InvalidSchemaField } from "./errors/schemaError";

export class Command implements CommandSchema {
  public readonly command: string;
  public readonly summary: string;
  public readonly description?: string;
  public readonly output?: string;
  private readonly _path: string[];
  private logger: log4js.Logger;

  constructor(newCommand: CommandSchema, path: string[] = []) {
    const { command, summary, description, output } = newCommand;
    this.logger = log4js.getLogger();
    this._path = path;

    if (!command || SchemaValidator.isEmpty(command)) {
      throw new InvalidSchemaField(
        "Command",
        "command",
        ERROR_MESSAGES.FIELD_EMPTY,
        "critical",
        this._path,
        this
      );
    }
    this.command = command;

    if (SchemaValidator.isEmpty(summary)) {
      throw new InvalidSchemaField(
        "Command",
        "command",
        ERROR_MESSAGES.FIELD_EMPTY,
        "critical",
        this._path,
        this
      );
    }

    this.summary = summary;
  }
}
