import { SchemaValidator } from "./schemaValidator";
import { OptionSchema } from "./interfaces";
export declare class Option extends SchemaValidator implements OptionSchema {
    long?: string[];
    short?: string[];
    summary: string;
    description?: string;
    name?: string;
    expectsArg?: boolean;
    defaultArg?: string | number | boolean;
    private _path?;
    constructor(option: OptionSchema, _path?: string[]);
}
//# sourceMappingURL=option.d.ts.map