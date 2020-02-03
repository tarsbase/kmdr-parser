import { Command } from "./command";
import { ERROR_MESSAGES, WARNING_MESSAGES } from "./contants";
import { InvalidSchemaField, MissingSchemaField } from "./errors/schemaError";
import { ProgramSchema } from "./interfaces";
import { Option } from "./option";
import SchemaValidator from "./schemaValidator";
import { Subcommand } from "./subcommand";
import WarningMessage from "./warningMessage";
import { Argument } from ".";

export class Program implements ProgramSchema {
  public readonly _warnings: WarningMessage[] = [];
  public readonly args?: Argument[];
  public readonly description?: string;
  public readonly examples?: Command[];
  public readonly expectsCommand?: boolean;
  public readonly link?: string;
  public readonly locale?: string;
  public readonly name: string = "";
  public readonly options?: Option[];
  public readonly patterns?: string[];
  public readonly standard?: string;
  public readonly stickyOptions?: boolean;
  public readonly subcommands?: Subcommand[];
  public readonly summary: string = "";
  public readonly usage?: string;
  public readonly version?: string;

  private readonly _path: string[];

  constructor(program: ProgramSchema) {
    const {
      args,
      description,
      examples,
      expectsCommand,
      link,
      locale,
      name,
      options,
      stickyOptions,
      subcommands,
      summary,
      usage,
      version
    } = program;

    if (!name || name.trim() === "") {
      throw new MissingSchemaField("Program", "name");
    } else if (!SchemaValidator.isValidName(name)) {
      throw new InvalidSchemaField(
        "Program",
        "name",
        ERROR_MESSAGES.FIELD_NOT_VALID_CHARACTERS,
        "critical",
        [],
        this
      );
    }
    this.name = name.trim();
    this._path = [name];

    if (!summary || SchemaValidator.isEmpty(summary)) {
      throw new InvalidSchemaField(
        "Program",
        "summary",
        ERROR_MESSAGES.FIELD_NOT_STRING,
        "critical",
        this._path,
        this
      );
    }
    if (SchemaValidator.isLongerThan(summary, 120)) {
      const warningMsg = new WarningMessage(
        "Program",
        "summary",
        WARNING_MESSAGES.FIELD_TOO_LONG,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.endsWithLetter(summary)) {
      const warningMsg = new WarningMessage(
        "Program",
        "summary",
        WARNING_MESSAGES.FIELD_ENDS_WITH_NON_LETTER,
        summary,
        this._path
      );
      this._warnings.push(warningMsg);
    }
    if (!SchemaValidator.isCapitalized(summary)) {
      const warningMsg = new WarningMessage(
        "Program",
        "summary",
        WARNING_MESSAGES.FIELD_NOT_CAPITALIZED,
        summary,
        this._path
      );
    }
    this.summary = summary;

    if (!description) {
      this.description = "";
    } else if (typeof description !== "string") {
      throw new InvalidSchemaField(
        "Program",
        "description",
        ERROR_MESSAGES.FIELD_NOT_STRING,
        "critical",
        this._path,
        this
      );
    } else {
      this.description = description.trim();
    }

    if (!version) {
      this.version = "";
    } else {
      this.version = version.trim();
    }

    if (!link) {
      this.link = "";
    } else if (!SchemaValidator.isURL(link)) {
      throw new InvalidSchemaField(
        "Program",
        "link",
        ERROR_MESSAGES.FIELD_INVALID_LINK,
        "critical",
        this._path,
        this
      );
    } else {
      this.link = link.trim();
    }

    if (!locale) {
      this.locale = "en";
    } else {
      this.locale = locale.trim();
    }

    if (
      stickyOptions !== undefined &&
      !SchemaValidator.isBoolean(stickyOptions)
    ) {
      throw new InvalidSchemaField(
        "Program",
        "stickyOptions",
        ERROR_MESSAGES.FIELD_NOT_BOOLEAN,
        "critical",
        this._path,
        this
      );
    } else if (stickyOptions === true) {
      this.stickyOptions = true;
    }

    if (subcommands !== undefined) {
      if (!Array.isArray(subcommands)) {
        throw new InvalidSchemaField(
          "Program",
          "subcommands",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path,
          this
        );
      } else {
        this.subcommands = subcommands.map(subcommand => {
          const newSubcommand = new Subcommand(subcommand, [this.name]);
          if (newSubcommand.totalWarnings > 0) {
            this._warnings.push(...newSubcommand._warnings);
          }
          return newSubcommand;
        });
      }
    }

    if (options !== undefined) {
      if (!Array.isArray(options)) {
        throw new InvalidSchemaField(
          "Program",
          "options",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path,
          this
        );
      } else {
        this.options = options.map(option => {
          const newOption = new Option(option, [this.name]);
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
          "Program",
          "examples",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path,
          this
        );
      } else {
        this.examples = examples.map(example => new Command(example));
      }
    }

    if (
      expectsCommand !== undefined &&
      !SchemaValidator.isBoolean(expectsCommand)
    ) {
      throw new InvalidSchemaField(
        "Program",
        "expectsCommand",
        ERROR_MESSAGES.FIELD_NOT_BOOLEAN,
        "critical",
        this._path,
        this
      );
    } else if (expectsCommand === true) {
      this.expectsCommand = true;
    }

    if (args !== undefined) {
      if (!Array.isArray(args)) {
        throw new InvalidSchemaField(
          "Program",
          "args",
          ERROR_MESSAGES.FIELD_NOT_ARRAY,
          "critical",
          this._path,
          this
        );
      } else {
        this.args = args.map(arg => new Argument(arg));
      }
    }
  }

  get totalWarnings() {
    return this._warnings.length;
  }
}
