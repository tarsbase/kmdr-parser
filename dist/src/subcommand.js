"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("./option");
const schemaValidator_1 = require("./schemaValidator");
const ERROR_MESSAGES = {
    SUBCOMMAND_NAME_EMPTY: "Subcommand schema name cannot be empty",
    SUBCOMMAND_NAME_INCOMPATIBLE_CHARACTERS: "Subcommand schema name contains incompatible characters",
    SUBCOMMAND_SUMMARY_EMPTY: "Subcommand schema summary cannot be empty",
    SUBCOMMAND_ALIASES_INVALID: "Subcommand aliases must be an array of strings",
    SUBCOMMAND_STICKY_OPTIONS_INVALID: "Subcommand schema stickyOptions must be a boolean value"
};
class Subcommand extends schemaValidator_1.SchemaValidator {
    constructor(subcommand, path = null, props = { stickyOptions: false }) {
        super();
        this.name = "";
        this.summary = "";
        const { name, summary, aliases, description, subcommands, options, patterns, _path } = subcommand;
        const { stickyOptions } = props;
        if (!name || this.isEmpty(name)) {
            const msg = ERROR_MESSAGES.SUBCOMMAND_NAME_EMPTY;
            throw new Error(msg);
        }
        else if (!this.isValidName(name)) {
            const msg = ERROR_MESSAGES.SUBCOMMAND_NAME_INCOMPATIBLE_CHARACTERS;
            throw new Error(msg);
        }
        else {
            this.name = name.trim();
        }
        if (path) {
            this._path = [...path, this.name];
        }
        else {
            this._path = _path;
        }
        if (!summary || this.isEmpty(summary)) {
            const msg = ERROR_MESSAGES.SUBCOMMAND_SUMMARY_EMPTY;
            throw new Error(msg);
        }
        else {
            this.summary = summary;
        }
        if (!description) {
            this.description = "";
        }
        else {
            this.description = description.trim();
        }
        if (!aliases) {
            this.aliases = [];
        }
        else if (aliases.length > 0 && !this.isListOfStrings(aliases)) {
            const msg = ERROR_MESSAGES.SUBCOMMAND_ALIASES_INVALID;
            throw new Error(msg);
        }
        else if (aliases.length >= 0) {
            this.aliases = aliases;
        }
        if (stickyOptions !== undefined && !this.isBoolean(stickyOptions)) {
            const msg = ERROR_MESSAGES.SUBCOMMAND_STICKY_OPTIONS_INVALID;
            throw new Error(msg);
        }
        else {
            this.stickyOptions = stickyOptions;
        }
        if (!subcommands) {
            this.subcommands = [];
        }
        else {
            this.subcommands = subcommands.map(subcommand => new Subcommand(subcommand, this._path, { ...props }));
        }
        if (!options) {
            this.options = [];
        }
        else {
            try {
                this.options = options.map(option => new option_1.Option(option, this._path));
            }
            catch (err) {
                console.error("safasd");
                console.error(err);
            }
        }
        if (!patterns) {
            this.patterns = [];
        }
        else {
            this.patterns = patterns;
        }
    }
}
exports.Subcommand = Subcommand;
//# sourceMappingURL=subcommand.js.map