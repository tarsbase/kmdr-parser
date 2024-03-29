/**
 * Copyright 2019 Eddie Ramirez
 *
 * Interface to construct ProgramSchema object
 */

export interface GitHubRepo {
  createdAt: string;
  description: string;
  forks: number;
  homepage: string;
  issues: number;
  name: string;
  owner: string;
  size: number;
  stars: number;
  updatedAt: string;
  url: string;
}

export interface ArgumentSchema {
  description?: string;
  label?: string;
  meta?: object;
  name: string;
  summary: string;
  value: string;
  variadic?: boolean;
}

export interface ProgramSchema {
  args?: ArgumentSchema[];
  description?: string;
  environment?: EnvironmentSchema[];
  examples?: CommandSchema[];
  expectsCommand?: boolean;
  link?: string;
  locale?: string;
  name: string;
  options?: OptionSchema[];
  platforms?: string[];
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
  examples?: CommandSchema[];
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
  defaultValue?: string | number | boolean;
  description?: string;
  expectsArg?: boolean;
  expectsValue?: boolean;
  id?: number;
  long?: string[];
  name?: string;
  section?: string;
  short?: string[];
  summary: string;
  valueType?: string;
}

export interface SchemaStats {
  options: number;
  subcommands: number;
  examples: number;
}

export interface CommandSchema {
  ast?: string;
  summary: string;
  command: string;
  description?: string;
  output?: string;
}
