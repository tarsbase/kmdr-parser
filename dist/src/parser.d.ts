import Schema from "./schema";
export declare class Parser {
    private filename;
    private dirname;
    private fileContents;
    constructor(file: string, options: object);
    parse(): Schema;
    private openJSON;
    private openYAML;
}
//# sourceMappingURL=parser.d.ts.map