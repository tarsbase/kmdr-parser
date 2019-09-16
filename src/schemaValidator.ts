import validator from "validator";

export class SchemaValidator {
  protected constructor() {}
  isURL(str: string): boolean {
    return validator.isURL(str);
  }

  protected isValidName(str: string): boolean {
    const nameRegex: RegExp = new RegExp("^[a-zA-Z0-9-_.]+$");
    return nameRegex.test(str);
  }

  protected isEmpty(str: string): boolean {
    return str.trim() === "";
  }

  protected isListOfStrings(list: any): boolean {
    if (!Array.isArray(list)) {
      return false;
    }

    // let's assume an empty list of strings
    if (list.length === 0) {
      return true;
    }

    return list.some(item => typeof item === "string");
  }

  protected isBoolean(val: any): boolean {
    return typeof val === "boolean";
  }
}
