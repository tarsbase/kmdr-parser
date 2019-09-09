import { EnvironmentSchema } from "./interfaces";

class Environment implements EnvironmentSchema {
  public name: string = "";
  public summary: string = "";
  protected constructor() {}
}

export default Environment;
