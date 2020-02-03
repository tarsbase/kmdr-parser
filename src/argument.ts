/**
 * Copyright 2019 Eddie Ramirez
 */

import { ArgumentSchema } from "./interfaces";

export class Argument implements ArgumentSchema {
  public summary: string = "";
  public description?: string;
  public name: string;
  public variadic?: boolean;

  constructor(argument: ArgumentSchema) {
    const { summary, description, name, variadic } = argument;
    this.summary = summary;
    this.name = name;
    this.description = description;
    this.variadic = variadic;
  }
}
