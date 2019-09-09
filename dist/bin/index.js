#!/user/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require("../"));
const commander_1 = __importDefault(require("commander"));
commander_1.default.option("-f, --file <filename>", "output extra debugging");
commander_1.default.parse(process.argv);
if (commander_1.default.file) {
    const parser = new __1.default(commander_1.default.file);
}
//# sourceMappingURL=index.js.map