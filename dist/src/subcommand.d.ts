import SchemaValidator from "./schemaValidator";
import { OptionSchema, SubcommandSchema } from "./interfaces";
declare class Subcommand extends SchemaValidator implements SubcommandSchema {
    name: string;
    summary: string;
    aliases?: string[];
    description?: string;
    subcommands?: SubcommandSchema[];
    options?: OptionSchema[];
    patterns?: string[];
    _path?: string[];
    stickyOptions?: boolean;
    constructor(subcommand: SubcommandSchema, path?: string[] | null, props?: {
        stickyOptions: boolean;
    });
}
export default Subcommand;
//# sourceMappingURL=subcommand.d.ts.map