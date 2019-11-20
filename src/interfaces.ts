/**
 * Copyright 2019 Eddie Ramirez
 *
 * Interface to construct ProgramSchema object
 */

export interface ProgramSchema {
  description?: string;
  environment?: EnvironmentSchema[];
  examples?: CommandInterface[];
  link?: string;
  locale?: string;
  name: string;
  options?: OptionSchema[];
  platforms?: string[];
  stickyOptions?: boolean;
  subcommands?: SubcommandSchema[];
  summary: string;
  version?: string;
}

export interface SubcommandSchema {
  _path?: string[];
  aliases?: string[];
  description?: string;
  examples?: CommandInterface[];
  name: string;
  options?: OptionSchema[];
  patterns?: string[];
  stickyOptions?: boolean;
  subcommands?: SubcommandSchema[];
  summary: string;
}

export interface EnvironmentSchema {
  name: string;
  summary: string;
}

export interface OptionSchema {
  // argType?: boolean;
  defaultArg?: string | number | boolean;
  description?: string;
  expectsArg?: boolean;
  id?: number;
  long?: string[];
  name?: string;
  section?: string;
  short?: string[];
  source?: string;
  summary: string;
}

export interface SchemaStats {
  options: number;
  subcommands: number;
  examples: number;
}

export interface CommandInterface {
  summary: string;
  command: string;
  description?: string;
  output?: string;
}
