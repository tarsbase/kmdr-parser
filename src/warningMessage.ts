import util from "util";

export default class WarningMessage {
  public readonly message: string;
  public readonly schemaClass: string;
  public readonly field: string;
  public readonly value: any;
  public readonly path: string[] = [];

  constructor(
    schemaClass: string,
    field: string,
    message: string,
    value: any,
    path: string[]
  ) {
    this.schemaClass = schemaClass;
    this.field = field;
    this.message = message;
    this.value = value;
    this.path = path;
  }

  get formattedMsg() {
    const { schemaClass, field, message, value, path } = this;
    const formattedPath = util.inspect(path, { compact: true, colors: true });
    return `${schemaClass} field "${field}" at path ${formattedPath}: ${message}`;
  }
}
