import Option from "./option";
import SchemaValidator from "./schemaValidator";
import Subcommand from "./subcommand";
import { ProgramSchema } from "./interfaces";
declare class Program extends SchemaValidator implements ProgramSchema {
    name: string;
    summary: string;
    description?: string;
    version?: string;
    locale?: string;
    subcommands?: Subcommand[];
    options?: Option[];
    link?: string;
    patterns?: string[];
    stickyOptions: boolean;
    constructor(program: ProgramSchema);
}
export default Program;
//# sourceMappingURL=program.d.ts.map