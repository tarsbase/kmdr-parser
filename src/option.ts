import { SchemaValidator } from "./schemaValidator";
import { OptionSchema } from "./interfaces";
import OptionSchemaMissingPropertyError from "./errors/optionSchemaMissingPropertyError";

const ERROR_MESSAGES = {
  OPTION_DESCRIPTION_INVALID: "Option description must be a string",
  OPTION_EXPECTSARG_INVALID: "Option expectsArg must be a boolean value",
  OPTION_LONG_SHORT_EMPTY:
    "Option schema must have either a long or short option",
  OPTION_LONG_SHORT_INVALID: "Option long or short must be a list of strings",
  OPTION_NAME_INVALID: "Option schema name must be a string",
  OPTION_SUMMARY_EMPTY: `Option summary cannot be empty`
};

export class Option extends SchemaValidator implements OptionSchema {
  public long?: string[];
  public short?: string[];
  public summary: string = "";
  public description?: string;
  public name?: string;
  public expectsArg?: boolean;
  public defaultArg?: string | number | boolean;
  private _path?: string[];

  constructor(option: OptionSchema, _path?: string[]) {
    super();
    this._path = _path;
    const { summary, long, short, description, name, expectsArg } = option;

    if (name !== undefined && typeof name !== "string") {
      const msg = ERROR_MESSAGES.OPTION_NAME_INVALID;
      throw new Error(msg);
    } else if (name) {
      this.name = name.trim();
    }

    if (!summary || this.isEmpty(summary)) {
      const msg = ERROR_MESSAGES.OPTION_SUMMARY_EMPTY;
      throw new OptionSchemaMissingPropertyError(
        "summary",
        JSON.stringify(option)
      );
    } else {
      this.summary = summary.trim();
    }

    // todo: test every option is a word with no spaces
    if (!short && !long) {
      const msg = ERROR_MESSAGES.OPTION_LONG_SHORT_EMPTY;
      throw new Error(`${msg} at ${this._path && this._path.join(".")}`);
    } else if (
      (short !== undefined && short !== null && !this.isListOfStrings(short)) ||
      (long !== undefined && long !== null && !this.isListOfStrings(long))
    ) {
      const msg = ERROR_MESSAGES.OPTION_LONG_SHORT_INVALID;
      throw new Error(msg);
    } else {
      this.long = long;
      this.short = short;
    }

    if (
      expectsArg !== undefined &&
      expectsArg !== null &&
      typeof expectsArg !== "boolean"
    ) {
      const msg = ERROR_MESSAGES.OPTION_EXPECTSARG_INVALID;
      throw new Error(msg);
    } else {
      this.expectsArg = expectsArg;
    }

    if (
      description !== undefined &&
      description !== null &&
      typeof description !== "string"
    ) {
      const msg = ERROR_MESSAGES.OPTION_DESCRIPTION_INVALID;
      throw new Error(msg);
    } else {
      this.description = description;
    }
  }
}
