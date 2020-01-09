/**
 * Copyright 2019 Eddie Ramirez
 */

import validator from "validator";

export class SchemaValidator {
  public static isURL(str: string): boolean {
    return validator.isURL(str);
  }

  public static isValidName(str: string): boolean {
    const nameRegex: RegExp = new RegExp("^[a-zA-Z0-9-_.]+$");
    return nameRegex.test(str);
  }

  public static isEmpty(str: string): boolean {
    return str.trim() === "";
  }

  public static  isListOfStrings(list: any): boolean {
    if (!Array.isArray(list)) {
      return false;
    }

    // let's assume an empty list of strings
    if (list.length === 0) {
      return true;
    }

    return list.some(item => typeof item === "string");
  }

  public static isBoolean(val: any): boolean {
    return typeof val === "boolean";
  }
}
