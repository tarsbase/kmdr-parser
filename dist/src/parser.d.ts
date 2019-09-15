import Schema from "./schema";
declare class Parser {
    private filename;
    private dirname;
    private fileContents;
    constructor(file: string, options: object);
    parse(): Schema;
    private openJSON;
    private openYAML;
}
export default Parser;
//# sourceMappingURL=parser.d.ts.map