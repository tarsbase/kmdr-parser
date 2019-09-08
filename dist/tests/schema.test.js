"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = __importDefault(require("../../src/schema/schema"));
describe('A Schema can be created when', () => {
    test('a name a summary are provided', () => {
        const schema = {
            name: 'kmdr',
            summary: 'summary',
        };
        const newSchema = new schema_1.default(schema);
        expect(newSchema).toBeTruthy();
    });
});
describe('The kmdr program', () => {
    let newSchema;
    beforeAll(() => {
        const schema = {
            name: 'kmdr',
            subcommands: [
                {
                    name: 'test',
                    summary: 'subcommand test',
                },
                {
                    name: 'uno',
                    subcommands: [
                        {
                            name: 'dos',
                            subcommands: [
                                {
                                    name: 'tres',
                                    summary: 'subcommand tres',
                                },
                            ],
                            summary: 'subcommand dos',
                        },
                    ],
                    summary: 'subcommand uno',
                },
            ],
            summary: 'Explain commands',
        };
        newSchema = new schema_1.default(schema);
    });
    test('has a subcommand "test"', () => {
        expect(newSchema.hasSubcommand('test')).toBeTruthy();
    });
    test('does not have a subcommand "fake"', () => {
        expect(newSchema.hasSubcommand('fake')).toBeFalsy();
    });
    test('subcommand "uno" has a subcommand "dos"', () => {
        console.log('asdfsfad');
        expect(newSchema.hasSubcommand('dos', ['kmdr', 'uno'])).toBeTruthy();
    });
    test('subcommand "uno" does not have subcommand "tres"', () => {
        expect(newSchema.hasSubcommand('tres', ['kmdr', 'uno'])).toBeFalsy();
    });
    test('subcommand dos has subcommand "tres"', () => {
        expect(newSchema.hasSubcommand('tres', ['kmdr', 'uno', 'dos']));
    });
    test('outputs a valid JSON', () => {
        const expectedJSON = '{"name":"kmdr","summary":"Explain commands","stickyOptions":false,"description":"","version":"","link":"","locale":"en","subcommands":[{"name":"test","summary":"subcommand test","_path":["kmdr","test"],"description":"","aliases":[],"stickyOptions":false,"subcommands":[],"options":[],"patterns":[]},{"name":"uno","summary":"subcommand uno","_path":["kmdr","uno"],"description":"","aliases":[],"stickyOptions":false,"subcommands":[{"name":"dos","summary":"subcommand dos","_path":["kmdr","uno","dos"],"description":"","aliases":[],"stickyOptions":false,"subcommands":[{"name":"tres","summary":"subcommand tres","_path":["kmdr","uno","dos","tres"],"description":"","aliases":[],"stickyOptions":false,"subcommands":[],"options":[],"patterns":[]}],"options":[],"patterns":[]}],"options":[],"patterns":[]}],"options":[]}';
        expect(expectedJSON).toEqual(newSchema.toJSON());
    });
});
//# sourceMappingURL=schema.test.js.map