/**
 * Copyright 2019 Eddie Ramirez
 */

import validator from "validator";

export default class SchemaValidator {
  public static isURL(str: string): boolean {
    return validator.isURL(str);
  }

  public static isValidName(str: string): boolean {
    const nameRegex: RegExp = new RegExp("^[a-zA-Z0-9-_.:]+$");
    return nameRegex.test(str);
  }

  public static isEmpty(str: string): boolean {
    return str.trim() === "";
  }

  public static isEmptyString(str: string): boolean {
    return str.trim() === "";
  }

  public static isListOfStrings(list: any): boolean {
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

  public static isLongerThan(str: string, length: number) {
    return str.length > length;
  }

  public static isCapitalized(str: string) {
    const first = str.charCodeAt(0);

    return first >= 65 && first <= 90;
  }

  public static endsWithLetter(str: string) {
    if (str === "") return false;

    const last = str.charCodeAt(str.length - 1);

    if ((last >= 65 && last <= 90) || (last >= 97 && last <= 122)) {
      return true;
    }
    return false;
  }
}
