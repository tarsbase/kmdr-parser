import { Argument } from ".";

/**
 * Copyright 2019 Eddie Ramirez
 *
 * Interface to construct ProgramSchema object
 */

export interface ArgumentInterface {
  name: string;
  summary: string;
  description?: string;
  type?: string;
  default?: string;
}

export interface ProgramSchema {
  arguments?: ArgumentInterface[];
  description?: string;
  environment?: EnvironmentSchema[];
  examples?: CommandInterface[];
  expectsCommand?: boolean;
  link?: string;
  locale?: string;
  name: string;
  options?: OptionSchema[];
  platforms?: string[];
  standard?: string;
  stickyOptions?: boolean;
  subcommands?: SubcommandSchema[];
  summary: string;
  usage?: string;
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
  argument?: Argument;
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
  ast?: string;
  summary: string;
  command: string;
  description?: string;
  output?: string;
}
