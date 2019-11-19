import { Command } from "./command";
import { ProgramSchema } from "./interfaces";
import { Option } from "./option";
import { SchemaValidator } from "./schemaValidator";
import { Subcommand } from "./subcommand";

const ERROR_MESSAGES = {
  DESCRIPTION_INVALID: "Schema description must be a string",
  EXAMPLES_INVALID: "Schema command examples must be an array of examples",
  LINK_INVALID: "Schema link is invalid",
  NAME_EMPTY: "Schema name cannot be empty",
  NAME_INCOMPATIBLE_CHARACTERS:
    "Schema name can only have letters, digits, ., - and _",
  OPTIONS_INVALID: "Schema options must be an array of options",
  STICKY_OPTIONS_INVALID: "Schema stickyOptions must be of type boolean",
  SUBCOMMANDS_INVALID: "Schema subcommands must be an array of subcommands",
  SUMMARY_EMPTY: "Schema summary cannot be empty"
};

export class Program extends SchemaValidator implements ProgramSchema {
  public name: string = "";
  public summary: string = "";
  public description?: string;
  public version?: string;
  public locale?: string;
  public subcommands?: Subcommand[];
  public options?: Option[];
  public link?: string;
  public patterns?: string[];
  public stickyOptions: boolean = false;
  public examples?: Command[];

  constructor(program: ProgramSchema) {
    super();
    const {
      name,
      summary,
      description,
      version,
      locale,
      subcommands,
      options,
      link,
      stickyOptions,
      examples
    } = program;

    if (!name || name.trim() === "") {
      const msg = ERROR_MESSAGES.NAME_EMPTY;
      throw new Error(msg);
    } else if (!this.isValidName(name)) {
      const msg = ERROR_MESSAGES.NAME_INCOMPATIBLE_CHARACTERS;
      throw new Error(msg);
    } else {
      this.name = name.trim();
    }

    if (!summary || summary.trim() === "") {
      const msg = ERROR_MESSAGES.SUMMARY_EMPTY;
      throw new Error(msg);
    } else {
      this.summary = summary;
    }

    if (!description) {
      this.description = "";
    } else if (typeof description !== "string") {
      const msg = ERROR_MESSAGES.DESCRIPTION_INVALID;
      throw new Error(msg);
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
    } else if (!super.isURL(link)) {
      const msg = ERROR_MESSAGES.LINK_INVALID;
      throw new Error(msg);
    } else {
      this.link = link.trim();
    }
    if (!locale) {
      this.locale = "en";
    } else {
      this.locale = locale.trim();
    }

    if (stickyOptions !== undefined && !this.isBoolean(stickyOptions)) {
      const msg = ERROR_MESSAGES.STICKY_OPTIONS_INVALID;
      throw new Error(msg);
    } else if (stickyOptions === true) {
      this.stickyOptions = true;
    }

    if (!subcommands) {
      this.subcommands = [];
    } else if (!Array.isArray(subcommands)) {
      const msg = ERROR_MESSAGES.SUBCOMMANDS_INVALID;
      throw new Error(msg);
    } else {
      this.subcommands = subcommands.map(
        subcommand =>
          new Subcommand(subcommand, [this.name], {
            stickyOptions: this.stickyOptions
          })
      );
    }

    if (!options) {
      this.options = [];
    } else if (!Array.isArray(options)) {
      const msg = ERROR_MESSAGES.OPTIONS_INVALID;
      throw new Error(msg);
    } else {
      this.options = options.map(option => new Option(option));
    }

    if (examples !== undefined) {
      if (!Array.isArray(examples)) {
        const msg = ERROR_MESSAGES.EXAMPLES_INVALID;
        throw new Error(msg);
      } else {
        this.examples = examples.map(example => new Command(example));
      }
    }
  }
}
