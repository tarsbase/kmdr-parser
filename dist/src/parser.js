"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const schema_1 = __importDefault(require("./schema"));
class Parser {
    constructor(filename) {
        this.filename = filename;
        const extName = path_1.default.extname(filename);
        switch (extName) {
            case ".json": {
                this.openJSON(filename);
                break;
            }
            case ".yaml":
            case ".yml": {
                this.openYAML(filename);
                break;
            }
            default: {
                console.error("Only JSON or YAML formats are supported");
            }
        }
    }
    openJSON(filename) {
        const fileContents = fs_1.default.readFileSync(filename, "utf8");
        const json = JSON.parse(fileContents);
    }
    openYAML(filename) {
        // Get document, or throw exception on error
        try {
            const yamlContents = js_yaml_1.default.safeLoad(fs_1.default.readFileSync(filename, "utf8"));
            const schema = new schema_1.default(yamlContents);
        }
        catch (e) {
            console.log(e);
        }
    }
}
exports.default = Parser;
//# sourceMappingURL=parser.js.map