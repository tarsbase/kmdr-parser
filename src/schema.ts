/**
 * Copyright 2019 Eddie Ramirez
 */
import {
  OptionSchema,
  ProgramSchema,
  SchemaStats,
  SubcommandSchema
} from "./interfaces";
import { Program } from "./program";

class Schema {
  public static getSubcommand(
    word: string,
    schema: ProgramSchema | SubcommandSchema
  ): SubcommandSchema | null {
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

  public schema: ProgramSchema;

  constructor(schema: ProgramSchema) {
    try {
      this.schema = new Program(schema);
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
    limit: number = 1
  ): OptionSchema[] {
    if (!this.schema || !this.schema.options) {
      return [];
    }
    let matches: OptionSchema[] = [];
    // if searching at root level
    if (!path || path.length <= 1) {
      matches = this.matchOptions(word, this.schema.options);
    } else if (path.length >= 2 && this.schema.subcommands) {
      const subcommand = this.schema.subcommands.find(
        subcommand => subcommand.name === path[1]
      );
      if (subcommand) {
        const subPath = path.slice(1);
        matches = this.findNestedOptions(word, subPath, subcommand);
      }
    }
    return matches.slice(0, limit);
  }

  /**
   * Searches for a subcommand
   * @param word the subcommand name
   * @param path the subcommand path where the subcommand is expected to be found
   */
  public findSubcommand(
    word: string,
    path?: string[]
  ): SubcommandSchema | null {
    if (!this.schema || !this.schema.subcommands) {
      return null;
    }

    if (this.schema.subcommands && (!path || path.length === 1)) {
      return Schema.getSubcommand(word, this.schema) || null;
    } else if (path && path.length >= 2) {
      let currentCmd = Schema.getSubcommand(path[1], this.schema);
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
    subcommands: SubcommandSchema[]
  ): SubcommandSchema | null {
    const matches = subcommands.filter(
      (subcommand: SubcommandSchema) => subcommand.name === word
    );
    if (!matches) {
      return null;
    }

    return matches[0];
  }

  public takesStickyOptions(): boolean {
    return this.schema.stickyOptions ? true : false;
  }

  public toJSON() {
    return JSON.stringify(this.schema);
  }

  public toYAML() {
    console.log("no implementation");
  }

  public get stats(): SchemaStats {
    const tally: SchemaStats = { options: 0, subcommands: 0, examples: 0 };

    const getTotals = (
      acc: SchemaStats,
      schema?: ProgramSchema | SubcommandSchema
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

    return getTotals(tally, this.schema);
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
    subcommand: SubcommandSchema
  ): OptionSchema[] {
    if (!subcommand.options) {
      return [];
    }

    if (path.length === 1) {
      return this.matchOptions(word, subcommand.options);
    } else if (subcommand.subcommands) {
      const newSubcommand = subcommand.subcommands.find(
        subcommand => subcommand.name === path[1]
      );
      if (newSubcommand) {
        const subPath = path.slice(1);
        return this.findNestedOptions(word, subPath, newSubcommand);
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
    subcommand: SubcommandSchema
  ): SubcommandSchema | null {
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

  private matchOptions(word: string, options: OptionSchema[]): OptionSchema[] {
    return options.filter((option: OptionSchema) => {
      const { long, short } = option;
      if ((long && long.includes(word)) || (short && short.includes(word))) {
        return true;
      }
    });
  }
}

export default Schema;
