/**
 * Copyright 2019 Eddie Ramirez
 */

import { ArgumentSchema } from "./interfaces";

export class Argument implements ArgumentSchema {
  public readonly _path?: string[];
  public readonly summary: string = "";
  public readonly description?: string;
  public readonly name: string;
  public readonly variadic?: boolean;
  public readonly value: string;
  public readonly meta?: object;

  constructor(argument: ArgumentSchema) {
    const { summary, description, meta, name, variadic, value } = argument;
    this.summary = summary;
    this.meta = meta;
    this.name = name;
    this.description = description;
    this.value = value;
    this.variadic = variadic;
  }
}
