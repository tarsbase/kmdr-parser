/**
 * Copyright 2019 Eddie Ramirez
 */

import { SchemaStats } from "./interfaces";
import { Program, Subcommand, Option, ProgramSchema } from ".";
import WarningMessage from "./warningMessage";

class Schema {
  public static getOptionFormat(
    text: string,
    option: Option
  ): string | undefined {
    if (option.long?.includes(text)) {
      return "long";
    } else if (option.short?.includes(text)) {
      return "short";
    }
  }

  public static getSubcommand(
    word: string,
    schema: Program | Subcommand
  ): Subcommand | null {
    if (!schema.subcommands) {
      return null;
    }
    return (
      schema.subcommands.find(
        subcommand =>
          subcommand.name === word ||
          (subcommand.aliases && subcommand.aliases.includes(word))
      ) || null
    );
  }

  public static subcmdPathToName(subcommandPath: string[]): string {
    return subcommandPath.join("-") || "";
  }

  public program: Program;

  constructor(program: ProgramSchema) {
    try {
      this.program = new Program(program);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Searches for options
   * @param word the option word
   * @param path the subcommand path where the option should be searched
   * @param limit return up to a number of matches
   */
  public findOptions(
    word: string,
    path?: string[],
    limit: number = 1,
    format: string = "all"
  ): Option[] {
    if (!this.program) {
      return [];
    }

    let matches: Option[] = [];
    // if searching at root level
    if (this.program.options && (!path || path.length <= 1)) {
      matches = this.matchOptions(word, this.program.options, format);
    } else if (path && path.length >= 2 && this.program.subcommands) {
      const subcommand = this.program.subcommands.find(
        subcommand => subcommand.name === path[1]
      );
      if (subcommand) {
        const subPath = path.slice(1);
        matches = this.findNestedOptions(word, subPath, subcommand, format);
      }
    }
    return matches.slice(0, limit);
  }

  /**
   * Searches for a subcommand
   * @param word the subcommand name
   * @param path the subcommand path where the subcommand is expected to be found
   */
  public findSubcommand(word: string, path?: string[]): Subcommand | null {
    if (!this.program || !this.program.subcommands) {
      return null;
    }

    if (this.program.subcommands && (!path || path.length === 1)) {
      return Schema.getSubcommand(word, this.program) || null;
    } else if (path && path.length >= 2) {
      let currentCmd = Schema.getSubcommand(path[1], this.program);
      for (let i = 1; i < path.length && currentCmd; i++) {
        const currentPath = path[i];
        const nextPath = i === path.length - 1 ? word : path[i + 1];

        currentCmd = Schema.getSubcommand(nextPath, currentCmd);
      }
      return currentCmd;
    }

    return null;
  }

  public hasOption(word: string, path?: string[]): boolean {
    const equalPos = word.indexOf("=");
    let optionWord = word;

    if (equalPos !== -1) {
      optionWord = optionWord.substring(0, equalPos);
    }

    const options = this.findOptions(optionWord, path);
    return options.length > 0;
  }

  public hasSubcommand(word: string, path?: string[]): boolean {
    return this.findSubcommand(word, path) !== null;
  }

  public matchSubcommand(
    word: string,
    subcommands: Subcommand[]
  ): Subcommand | null {
    const matches = subcommands.filter(
      (subcommand: Subcommand) => subcommand.name === word
    );
    if (!matches) {
      return null;
    }

    return matches[0];
  }

  public get takesStickyOptions(): boolean {
    return this.program.stickyOptions ? true : false;
  }

  public get expectsCommand(): boolean {
    return this.program.expectsCommand ? true : false;
  }

  public get warnings(): WarningMessage[] {
    return this.program._warnings;
  }

  public toJSON() {
    return JSON.stringify(this.program);
  }

  public toYAML() {
    console.log("no implementation");
  }

  public get stats(): SchemaStats {
    const tally: SchemaStats = { options: 0, subcommands: 0, examples: 0 };

    const getTotals = (
      acc: SchemaStats,
      schema?: Program | Subcommand
    ): SchemaStats => {
      let localAcc = { ...acc };

      if (schema) {
        if (schema.options && schema.options.length > 0) {
          localAcc.options += schema.options.length;
        }

        if (schema.subcommands && schema.subcommands.length > 0) {
          localAcc.subcommands += schema.subcommands.length;

          for (const subcommand of schema.subcommands) {
            localAcc = getTotals(localAcc, subcommand);
          }
        }

        if (schema.examples && schema.examples.length > 0) {
          localAcc.examples += schema.examples.length;
        }
      }

      return localAcc;
    };

    return getTotals(tally, this.program);
  }

  /**
   * Searches for a nested options recursively
   * @param word the option word
   * @param path the subcommand path where the option should be searched
   * @param subcommand the current root subcommand schema
   */
  private findNestedOptions(
    word: string,
    path: string[],
    subcommand: Subcommand,
    format: string = "all"
  ): Option[] {
    if (!subcommand.options) {
      return [];
    }

    if (path.length === 1) {
      return this.matchOptions(word, subcommand.options, format);
    } else if (subcommand.subcommands) {
      const newSubcommand = subcommand.subcommands.find(
        subcommand => subcommand.name === path[1]
      );
      if (newSubcommand) {
        const subPath = path.slice(1);
        return this.findNestedOptions(word, subPath, newSubcommand, format);
      }
    }

    return [];
  }

  /**
   * Searches for a nested subcommand recursively
   * @param word the subcommand name word
   * @param path the subcommand path where the subcommand should be searched
   * @param subcommand the current root subcommand schema
   */
  private findNestedSubcommand(
    word: string,
    path: string[],
    subcommand: Subcommand
  ): Subcommand | null {
    if (!subcommand.subcommands) {
      return null;
    }

    if (path.length === 1) {
      return (
        subcommand.subcommands.find(subcommand => subcommand.name === word) ||
        null
      );
    } else if (subcommand.subcommands) {
      const newSubcommand = Schema.getSubcommand(word, subcommand);
      if (newSubcommand) {
        const subPath = path.slice(1);
        return this.findNestedSubcommand(word, subPath, newSubcommand);
      }
    }
    return null;
  }

  private matchOptions(
    word: string,
    options: Option[],
    format: string = "all"
  ): Option[] {
    if (format === "short") {
      return options.filter((option: Option) => {
        const { short } = option;
        if (short && short.includes(word)) {
          return true;
        }
      });
    } else if (format == "long") {
      return options.filter((option: Option) => {
        const { long } = option;
        if (long && long.includes(word)) {
          return true;
        }
      });
    } else {
      return options.filter((option: Option) => {
        const { long, short } = option;
        if ((long && long.includes(word)) || (short && short.includes(word))) {
          return true;
        }
      });
    }
  }
}

export default Schema;
