"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subcommand_1 = __importDefault(require("../../src/schema/subcommand"));
describe('A Subcommand schema cannot be created when', () => {
    test('the name key is not provided, a "Subcommand schema name cannot be empty" error is thrown', () => {
        expect(() => {
            new subcommand_1.default({});
        }).toThrowError(/name cannot be empty/);
    });
    test('the name "as#12?" contains incompatible characters, a "Subcommand schema name contains incompatible characters" error is thrown', () => {
        expect(() => {
            new subcommand_1.default({ name: 'as#12?' });
        }).toThrowError(/name contains incompatible characters/);
    });
    test('the summary key is not provided, a "Subcommand schema summary cannot be empty" error is thrown', () => {
        expect(() => {
            new subcommand_1.default({ name: 'test', summary: '' });
        }).toThrowError(/summary cannot be empty/);
    });
    test('the aliases key is not an array of strings, a "Subcommand schema aliases must be an array of strings"', () => {
        expect(() => {
            new subcommand_1.default({ name: 'test', summary: 'test', aliases: 'something wrong' });
        });
    });
});
describe('A subcommand schema is created when', () => {
    test('the name and summary are provide', () => {
        const subcommand = { name: 'subcommand', summary: 'a subcommand' };
        expect(new subcommand_1.default(subcommand, ['program'])).toMatchObject(subcommand);
    });
});
//# sourceMappingURL=subcommand.test.js.map