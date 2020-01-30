import { ERROR_MESSAGES } from "../contants";

export default class SchemaError extends Error {
  public readonly severity: string;
  public readonly name: string;
  public readonly field: string;
  public readonly path?: string[];
  public readonly schemaClass: string;
  public readonly message: string;
  public readonly schema: any;

  constructor(
    schemaClass: string,
    message: string,
    field: string,
    name: string,
    severity: string,
    path?: string[],
    schema?: any
  ) {
    super(message);
    this.message = message;
    this.severity = severity;
    this.name = name;
    this.field = field;
    this.schemaClass = schemaClass;
    this.path = path;
    this.schema = schema;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class InvalidSchemaField extends SchemaError {
  constructor(
    schemaClass: string,
    field: string,
    message: string,
    severity: string,
    path?: string[],
    schema?: any
  ) {
    super(
      schemaClass,
      message,
      field,
      "InvalidSchemaField",
      severity,
      path,
      schema
    );
  }
}
// tslint:disable-next-line: max-classes-per-file
export class MissingSchemaField extends SchemaError {
  constructor(
    schemaClass: string,
    field: string,
    path?: string[],
    schema?: any
  ) {
    super(
      schemaClass,
      ERROR_MESSAGES.FIELD_EMPTY,

      field,
      "MissingSchemaField",
      "critical",
      path,
      schema
    );
  }
}
