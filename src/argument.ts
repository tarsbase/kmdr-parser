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

  constructor(argument: ArgumentSchema) {
    const { summary, description, name, variadic } = argument;
    this.summary = summary;
    this.name = name;
    this.description = description;
    this.variadic = variadic;
  }
}
