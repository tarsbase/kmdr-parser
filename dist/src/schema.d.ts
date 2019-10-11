/**
 * Copyright 2019 Eddie Ramirez
 */
import { OptionSchema, ProgramSchema, SchemaStats, SubcommandSchema } from "./interfaces";
declare class Schema {
    static getSubcommand(word: string, schema: ProgramSchema | SubcommandSchema): SubcommandSchema | null;
    static subcmdPathToName(subcommandPath: string[]): string;
    schema: ProgramSchema;
    constructor(schema: ProgramSchema);
    /**
     * Searches for options
     * @param word the option word
     * @param path the subcommand path where the option should be searched
     * @param limit return up to a number of matches
     */
    findOptions(word: string, path?: string[], limit?: number): OptionSchema[];
    /**
     * Searches for a subcommand
     * @param word the subcommand name
     * @param path the subcommand path where the subcommand is expected to be found
     */
    findSubcommand(word: string, path?: string[]): SubcommandSchema | null;
    hasOption(word: string, path?: string[]): boolean;
    hasSubcommand(word: string, path?: string[]): boolean;
    matchSubcommand(word: string, subcommands: SubcommandSchema[]): SubcommandSchema | null;
    takesStickyOptions(): boolean;
    toJSON(): string;
    toYAML(): void;
    readonly stats: SchemaStats;
    /**
     * Searches for a nested options recursively
     * @param word the option word
     * @param path the subcommand path where the option should be searched
     * @param subcommand the current root subcommand schema
     */
    private findNestedOptions;
    /**
     * Searches for a nested subcommand recursively
     * @param word the subcommand name word
     * @param path the subcommand path where the subcommand should be searched
     * @param subcommand the current root subcommand schema
     */
    private findNestedSubcommand;
    private matchOptions;
}
export default Schema;
//# sourceMappingURL=schema.d.ts.map