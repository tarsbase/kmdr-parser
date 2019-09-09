declare class SchemaValidator {
    protected constructor();
    isURL(str: string): boolean;
    protected isValidName(str: string): boolean;
    protected isEmpty(str: string): boolean;
    protected isListOfStrings(list: any): boolean;
    protected isBoolean(val: any): boolean;
}
export default SchemaValidator;
//# sourceMappingURL=schemaValidator.d.ts.map