/**
 * Copyright 2019 Eddie Ramirez
 */

import { Command } from "./command";
import { InvalidSchemaField, MissingSchemaField } from "./errors/schemaError";
import { SubcommandSchema } from "./interfaces";
import { Option } from "./option";
import SchemaValidator from "./schemaValidator";
import { ERROR_MESSAGES, WARNING_MESSAGES } from "./contants";
import WarningMessage from "./warningMessage";
import util from "util";
import log4js from "log4js";

export class Subcommand implements SubcommandSchema {
  public readonly _warnings: WarningMessage[] = [];
  public readonly _path?: string[];
  public readonly aliases?: string[];
  public readonly description?: string;
  public readonly examples?: Command[];
  public readonly name: string = "";
  public readonly options?: Option[];
  public readonly patterns?: string[];
  public readonly stickyOptions?: boolean;
  public readonly subcommands?: Subcommand[];
  public readonly summary: string = "";

  private logger: log4js.Logger;

  constructor(
    subcommand: SubcommandSchema,
    path: string[] = [],
    props: { stickyOptions: boolean } = { stickyOptions: false }
  ) {
    const {
      name,
      summary,
      aliases,
      description,
      examples,
      subcommands,
      options,
      patterns,
      _path
    } = subcommand;

    const { stickyOptions } = props;
    this.logger = log4js.getLogger();

    if (!name || SchemaValidator.isEmpty(name)) {
      throw new MissingSchemaField("Subcommand", "name", path, this);
    } else if (!SchemaValidator.isValidName(name)) {
      throw new InvalidSchemaField(
        "Subcommand",
        "name",
        ERROR_MESSAGES.FIELD_NOT_VALID_CHARACTERS,
        "critical",
        path
      );
    }
    this.name = name.trim();

    if (path) {
      this._path = [...path, this.name];
    } else {
      this._path = path;
    }

    if (!summary || SchemaValidator.isEmpty(summary)) {
      throw new InvalidSchemaField(
        "Subcommand",
        "summary",
        ERROR_MESSAGES.FIELD_NOT_STRING,
        "critical",
        this._path
      );
    }
    if (SchemaValidator.isLongerThan(summary, 120)) {
      const warningMsg = new WarningMessage(
        "Subcommand",
        "summary",
        WARNING_MESSAGES.FIELD_TOO_LONG,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.endsWithLetter(summary)) {
      const warningMsg = new WarningMessage(
        "Subcommand",
        "summary",
        WARNING_MESSAGES.FIELD_ENDS_WITH_NON_LETTER,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.isCapitalized(summary)) {
      const warningMsg = new WarningMessage(
        "Subcommand",
        "summary",
        WARNING_MESSAGES.FIELD_NOT_CAPITALIZED,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }

    this.summary = summary;

    if (description !== undefined) {
      this.description = description.trim();
    }

    if (aliases !== undefined) {
      if (aliases.length > 0 && !SchemaValidator.isListOfStrings(aliases)) {
        throw new InvalidSchemaField(
          "Subcommand",
          "aliases",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path
        );
      } else if (aliases.length >= 0) {
        this.aliases = aliases;
      }
    }

    if (
      stickyOptions !== undefined &&
      !SchemaValidator.isBoolean(stickyOptions)
    ) {
      throw new InvalidSchemaField(
        "Subcommand",
        "stickyOptions",
        ERROR_MESSAGES.FIELD_NOT_BOOLEAN,
        "critical",
        this._path
      );
    } else {
      this.stickyOptions = stickyOptions;
    }

    if (subcommands !== undefined) {
      this.subcommands = subcommands.map(subcommand => {
        const newSubcommand = new Subcommand(subcommand, this._path, {
          ...props
        });
        if (newSubcommand.totalWarnings > 0) {
          this._warnings.push(...newSubcommand._warnings);
        }
        return newSubcommand;
      });
    }

    if (options !== undefined) {
      if (!Array.isArray(options)) {
        throw new InvalidSchemaField(
          "Subcommand",
          "options",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path
        );
      } else {
        this.options = options.map(option => {
          const newOption = new Option(option, this._path);

          if (newOption.totalWarnings > 0) {
            this._warnings.push(...newOption._warnings);
          }

          return newOption;
        });
      }
    }

    if (examples !== undefined) {
      if (!Array.isArray(examples)) {
        throw new InvalidSchemaField(
          "Subcommand",
          "examples",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path
        );
      } else {
        this.examples = examples.map(example => new Command(example));
      }
    }
  }

  get totalWarnings() {
    return this._warnings.length;
  }
}
