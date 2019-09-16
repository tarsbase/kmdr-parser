"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("./option");
exports.Option = option_1.Option;
const parser_1 = require("./parser");
exports.Parser = parser_1.Parser;
const program_1 = require("./program");
exports.Program = program_1.Program;
const schema_1 = __importDefault(require("./schema"));
const subcommand_1 = require("./subcommand");
exports.Subcommand = subcommand_1.Subcommand;
exports.default = schema_1.default;
//# sourceMappingURL=index.js.map