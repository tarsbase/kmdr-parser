import { EnvironmentSchema } from "./interfaces";

export class Environment implements EnvironmentSchema {
  public name: string = "";
  public summary: string = "";
  protected constructor() {}
}
