import { Command } from "./command";
import { OptionSchema, SubcommandSchema } from "./interfaces";
import { Option } from "./option";
import { SchemaValidator } from "./schemaValidator";

const ERROR_MESSAGES = {
  SUBCOMMAND_ALIASES_INVALID: "Subcommand aliases must be an array of strings",
  SUBCOMMAND_NAME_EMPTY: "Subcommand schema name cannot be empty",
  SUBCOMMAND_NAME_INCOMPATIBLE_CHARACTERS:
    "Subcommand schema name contains incompatible characters",
  SUBCOMMAND_STICKY_OPTIONS_INVALID:
    "Subcommand schema stickyOptions must be a boolean value",
  SUBCOMMAND_SUMMARY_EMPTY: "Subcommand schema summary cannot be empty",
  SUBCOMMAND_EXAMPLES_INVALID:
    "Subcommand schema command examples must be an array of examples"
};

export class Subcommand extends SchemaValidator implements SubcommandSchema {
  public name: string = "";
  public summary: string = "";
  public aliases?: string[];
  public description?: string;
  public examples?: Command[];
  public subcommands?: SubcommandSchema[];
  public options?: OptionSchema[];
  public patterns?: string[];
  public _path?: string[];
  public stickyOptions?: boolean;

  constructor(
    subcommand: SubcommandSchema,
    path: string[] | null = null,
    props: { stickyOptions: boolean } = { stickyOptions: false }
  ) {
    super();
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

    if (!name || this.isEmpty(name)) {
      const msg = ERROR_MESSAGES.SUBCOMMAND_NAME_EMPTY;
      throw new Error(msg);
    } else if (!this.isValidName(name)) {
      const msg = ERROR_MESSAGES.SUBCOMMAND_NAME_INCOMPATIBLE_CHARACTERS;
      throw new Error(msg);
    } else {
      this.name = name.trim();
    }

    if (path) {
      this._path = [...path, this.name];
    } else {
      this._path = _path;
    }

    if (!summary || this.isEmpty(summary)) {
      const msg = ERROR_MESSAGES.SUBCOMMAND_SUMMARY_EMPTY;
      throw new Error(msg);
    } else {
      this.summary = summary;
    }

    if (description !== undefined) {
      this.description = description.trim();
    }

    if (aliases !== undefined) {
      if (aliases.length > 0 && !this.isListOfStrings(aliases)) {
        const msg = ERROR_MESSAGES.SUBCOMMAND_ALIASES_INVALID;
        throw new Error(msg);
      } else if (aliases.length >= 0) {
        this.aliases = aliases;
      }
    }

    if (stickyOptions !== undefined && !this.isBoolean(stickyOptions)) {
      const msg = ERROR_MESSAGES.SUBCOMMAND_STICKY_OPTIONS_INVALID;
      throw new Error(msg);
    } else {
      this.stickyOptions = stickyOptions;
    }

    if (subcommands !== undefined) {
      this.subcommands = subcommands.map(
        subcommand => new Subcommand(subcommand, this._path, { ...props })
      );
    }

    if (options !== undefined) {
      try {
        this.options = options.map(option => new Option(option, this._path));
      } catch (err) {
        console.error("safasd");
        console.error(err);
      }
    }

    if (examples !== undefined) {
      if (!Array.isArray(examples)) {
        const msg = ERROR_MESSAGES.SUBCOMMAND_EXAMPLES_INVALID;
        throw new Error(msg);
      } else {
        this.examples = examples.map(example => new Command(example));
      }
    }
  }
}
