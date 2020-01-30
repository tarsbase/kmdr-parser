/**
 * Copyright 2019 Eddie Ramirez
 */

import { Argument } from "./argument";
import { ERROR_MESSAGES, WARNING_MESSAGES } from "./contants";
import { InvalidSchemaField, MissingSchemaField } from "./errors/schemaError";
import { OptionSchema } from "./interfaces";
import SchemaValidator from "./schemaValidator";
import WarningMessage from "./warningMessage";
import log4js from "log4js";

export class Option implements OptionSchema {
  public readonly long?: string[];
  public readonly short?: string[];
  public readonly summary: string = "";
  public readonly description?: string;
  public readonly name?: string;
  public readonly expectsArg?: boolean;
  public readonly argument?: Argument;
  private readonly _path: string[];
  public readonly _warnings: WarningMessage[] = [];
  private logger: log4js.Logger;

  constructor(option: OptionSchema, path: string[] = []) {
    this._path = path;
    this.logger = log4js.getLogger();
    const {
      argument,
      summary,
      long,
      short,
      description,
      name,
      expectsArg
    } = option;

    if (name !== undefined && typeof name !== "string") {
      // todo
    } else if (name) {
      this.name = name.trim();
    }

    if (!summary || SchemaValidator.isEmpty(summary)) {
      throw new InvalidSchemaField(
        "Option",
        "summary",
        ERROR_MESSAGES.FIELD_NOT_STRING,
        "critical",
        this._path,
        this
      );
    }
    if (SchemaValidator.isLongerThan(summary, 120)) {
      const warningMsg = new WarningMessage(
        "Option",
        "summary",
        WARNING_MESSAGES.FIELD_TOO_LONG,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.endsWithLetter(summary)) {
      const warningMsg = new WarningMessage(
        "Option",
        "summary",
        WARNING_MESSAGES.FIELD_ENDS_WITH_NON_LETTER,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.isCapitalized(summary)) {
      const warningMsg = new WarningMessage(
        "Option",
        "summary",
        WARNING_MESSAGES.FIELD_NOT_CAPITALIZED,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    this.summary = summary.trim();

    // todo: test every option is a word with no spaces
    if (!short && !long) {
      throw new MissingSchemaField("Option", "short, long");
    } else if (
      short !== undefined &&
      short !== null &&
      !SchemaValidator.isListOfStrings(short)
    ) {
      throw new InvalidSchemaField(
        "Option",
        "short",
        ERROR_MESSAGES.FIELD_NOT_ARRAY,
        "critical",
        this._path,
        this
      );
    } else if (
      long !== undefined &&
      long !== null &&
      !SchemaValidator.isListOfStrings(long)
    ) {
      throw new InvalidSchemaField(
        "Option",
        "long",
        ERROR_MESSAGES.FIELD_NOT_ARRAY,
        "critical",
        this._path,
        this
      );
    } else {
      this.long = long;
      this.short = short;
    }

    if (
      expectsArg !== undefined &&
      expectsArg !== null &&
      typeof expectsArg !== "boolean"
    ) {
      throw new InvalidSchemaField(
        "Option",
        "expectsArg",
        ERROR_MESSAGES.FIELD_NOT_BOOLEAN,
        "critical",
        this._path,
        this
      );
    } else {
      this.expectsArg = expectsArg;
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      throw new InvalidSchemaField(
        "Option",
        "description",
        ERROR_MESSAGES.FIELD_NOT_STRING,
        "critical",
        this._path
      );
    } else {
      this.description = description;
    }

    if (argument) {
      this.argument = new Argument(argument);
    }
  }

  get totalWarnings() {
    return this._warnings.length;
  }
}
