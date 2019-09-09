"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
class SchemaValidator {
    constructor() { }
    isURL(str) {
        return validator_1.default.isURL(str);
    }
    isValidName(str) {
        const nameRegex = new RegExp("^[a-zA-Z0-9-_.]+$");
        return nameRegex.test(str);
    }
    isEmpty(str) {
        return str.trim() === "";
    }
    isListOfStrings(list) {
        if (!Array.isArray(list)) {
            return false;
        }
        // let's assume an empty list of strings
        if (list.length === 0) {
            return true;
        }
        return list.some(item => typeof item === "string");
    }
    isBoolean(val) {
        return typeof val === "boolean";
    }
}
exports.default = SchemaValidator;
//# sourceMappingURL=schemaValidator.js.map