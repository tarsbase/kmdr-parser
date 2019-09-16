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
    constructor(file, options) {
        this.fileContents = {};
        this.filename = path_1.default.basename(file);
        this.dirname = path_1.default.dirname(file);
        const extName = path_1.default.extname(file);
        switch (extName) {
            case ".json": {
                this.openJSON(path_1.default.normalize(file));
                break;
            }
            case ".yaml":
            case ".yml": {
                this.openYAML(path_1.default.normalize(file));
                break;
            }
            default: {
                throw Error("Only JSON or YAML file formats are supported");
            }
        }
    }
    parse() {
        try {
            return new schema_1.default(this.fileContents);
        }
        catch (err) {
            throw err;
        }
    }
    openJSON(filename) {
        try {
            const fileContents = fs_1.default.readFileSync(filename, "utf8");
            const json = JSON.parse(fileContents);
            this.fileContents = json;
        }
        catch (err) {
            throw err;
        }
    }
    openYAML(filename) {
        // Get document, or throw exception on error
        try {
            const yamlContents = js_yaml_1.default.safeLoad(fs_1.default.readFileSync(filename, "utf8"));
            this.fileContents = yamlContents;
        }
        catch (err) {
            throw err;
        }
    }
}
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map