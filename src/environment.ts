import { EnvironmentSchema } from "./interfaces";

class Environment implements EnvironmentSchema {
  protected name: string;
  protected summary: string;
  protected constructor() {}
}

export default Environment;
