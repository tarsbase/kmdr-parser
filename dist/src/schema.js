"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("./program"));
class Schema {
    constructor(schema) {
        try {
            this.schema = new program_1.default(schema);
        }
        catch (err) {
            throw err;
        }
    }
    static getSubcommand(word, schema) {
        if (!schema.subcommands) {
            return null;
        }
        return (schema.subcommands.find(subcommand => subcommand.name === word ||
            (subcommand.aliases && subcommand.aliases.includes(word))) || null);
    }
    static subcmdPathToName(subcommandPath) {
        return subcommandPath.join("-") || "";
    }
    /**
     * Searches for options
     * @param word the option word
     * @param path the subcommand path where the option should be searched
     * @param limit return up to a number of matches
     */
    findOptions(word, path, limit = 1) {
        if (!this.schema || !this.schema.options) {
            return [];
        }
        let matches = [];
        // if searching at root level
        if (!path || path.length <= 1) {
            matches = this.matchOptions(word, this.schema.options);
        }
        else if (path.length >= 2 && this.schema.subcommands) {
            const subcommand = this.schema.subcommands.find(subcommand => subcommand.name === path[1]);
            if (subcommand) {
                const subPath = path.slice(1);
                matches = this.findNestedOptions(word, subPath, subcommand);
            }
        }
        return matches.slice(0, limit);
    }
    /**
     * Searches for a subcommand
     * @param word the subcommand name
     * @param path the subcommand path where the subcommand is expected to be found
     */
    findSubcommand(word, path) {
        if (!this.schema || !this.schema.subcommands) {
            return null;
        }
        if (this.schema.subcommands && (!path || path.length === 1)) {
            return Schema.getSubcommand(word, this.schema) || null;
        }
        else if (path && path.length >= 2) {
            let currentCmd = Schema.getSubcommand(path[1], this.schema);
            for (let i = 1; i < path.length && currentCmd; i++) {
                const currentPath = path[i];
                const nextPath = i === path.length - 1 ? word : path[i + 1];
                currentCmd = Schema.getSubcommand(nextPath, currentCmd);
            }
            return currentCmd;
        }
        return null;
    }
    hasOption(word, path) {
        const equalPos = word.indexOf("=");
        let optionWord = word;
        if (equalPos !== -1) {
            optionWord = optionWord.substring(0, equalPos);
        }
        const options = this.findOptions(optionWord, path);
        return options.length > 0;
    }
    hasSubcommand(word, path) {
        return this.findSubcommand(word, path) !== null;
    }
    matchSubcommand(word, subcommands) {
        const matches = subcommands.filter((subcommand) => subcommand.name === word);
        if (!matches) {
            return null;
        }
        return matches[0];
    }
    takesStickyOptions() {
        return this.schema.stickyOptions ? true : false;
    }
    toJSON() {
        return JSON.stringify(this.schema);
    }
    toYAML() {
        console.log("no implementation");
    }
    /**
     * Searches for a nested options recursively
     * @param word the option word
     * @param path the subcommand path where the option should be searched
     * @param subcommand the current root subcommand schema
     */
    findNestedOptions(word, path, subcommand) {
        if (!subcommand.options) {
            return [];
        }
        if (path.length === 1) {
            return this.matchOptions(word, subcommand.options);
        }
        else if (subcommand.subcommands) {
            const newSubcommand = subcommand.subcommands.find(subcommand => subcommand.name === path[1]);
            if (newSubcommand) {
                const subPath = path.slice(1);
                return this.findNestedOptions(word, subPath, newSubcommand);
            }
        }
        return [];
    }
    /**
     * Searches for a nested subcommand recursively
     * @param word the subcommand name word
     * @param path the subcommand path where the subcommand should be searched
     * @param subcommand the current root subcommand schema
     */
    findNestedSubcommand(word, path, subcommand) {
        if (!subcommand.subcommands) {
            return null;
        }
        if (path.length === 1) {
            return (subcommand.subcommands.find(subcommand => subcommand.name === word) ||
                null);
        }
        else if (subcommand.subcommands) {
            const newSubcommand = Schema.getSubcommand(word, subcommand);
            if (newSubcommand) {
                const subPath = path.slice(1);
                return this.findNestedSubcommand(word, subPath, newSubcommand);
            }
        }
        return null;
    }
    matchOptions(word, options) {
        return options.filter((option) => {
            const { long, short } = option;
            if ((long && long.includes(word)) || (short && short.includes(word))) {
                return true;
            }
        });
    }
}
exports.default = Schema;
//# sourceMappingURL=schema.js.map