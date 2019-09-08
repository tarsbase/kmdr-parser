"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const optionSchemaError_1 = __importDefault(require("./optionSchemaError"));
class OptionSchemaMissingPropertyError extends optionSchemaError_1.default {
    constructor(property, optionSchema) {
        super(`Property '${property}' missing from Option Schema ${optionSchema.toString()}`);
        this.name = 'OptionSchemaMissingPropertyError';
    }
}
exports.default = OptionSchemaMissingPropertyError;
//# sourceMappingURL=optionSchemaMissingPropertyError.js.map