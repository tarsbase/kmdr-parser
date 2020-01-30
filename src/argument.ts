/**
 * Copyright 2019 Eddie Ramirez
 */

import { ArgumentInterface } from "./interfaces";

export class Argument implements ArgumentInterface {
  public summary: string = "";
  public description?: string;
  public name: string;
  public type?: string;
  public default?: string;

  constructor(arg: ArgumentInterface) {
    this.summary = arg.summary;
    this.name = arg.name;
    this.type = arg.type;
    this.default = arg.default;
  }
}
