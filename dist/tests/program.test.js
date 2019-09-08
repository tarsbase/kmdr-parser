"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = __importDefault(require("../../src/schema/program"));
describe('A Program Schema cannot be created when', () => {
    test('the name key is not provided, a  "Schema name cannot be empty" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: '' });
        }).toThrowError(/name cannot be empty/);
    });
    test('the name "wrong Name" contains incompatible characters, a "Schema name can only have letters..." error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'wrong Name' });
        }).toThrowError(/name can only have letters, digits, ., - and _/);
    });
    test('the summary key is not provided, a "Schema summary cannot be empty" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: '' });
        }).toThrowError(/summary cannot be empty/);
    });
    test('the link is wrong, a "Schema link is invalid" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: 'summary', link: 'http/wronglink' });
        }).toThrowError(/link is invalid/);
    });
    test('the stickyOptions is not boolean, "Schema stickyOptions must be of type boolean" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: 'test', stickyOptions: 'saddsa' });
        }).toThrowError(/must be of type boolean/);
    });
    test('the subcommands value is not an array, "Schema subcommands must be an array of subcommands" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: 'test', subcommands: 'wrong value' });
        }).toThrowError(/must be an array of subcommands/);
    });
    test('the options value is not an array, "Schema options must be an array of options" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: 'test', options: 12 });
        }).toThrowError(/must be an array of options/);
    });
    test('the description value is not a string, "Schema description must be a string" error is thrown', () => {
        expect(() => {
            new program_1.default({ name: 'test', summary: 'test', description: [] });
        }).toThrowError(/description must be a string/);
    });
});
describe('A schema is created when', () => {
    test('the name and summary are provided', () => {
        const program = { name: 'docker-compose', summary: 'a docker program' };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
    test('a valid link is provided', () => {
        const program = {
            name: 'docker-compose',
            summary: 'a docker program',
            link: 'https://kmdr.sh/',
        };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
    test('one option is provided', () => {
        const program = {
            name: 'docker-compose',
            summary: 'a docker program',
            link: 'https://kmdr.sh/',
            options: [{ name: 'version', short: ['-v'], summary: 'shows verssion' }],
        };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
    test('two options are provided', () => {
        const program = {
            name: 'docker-compose',
            summary: 'a docker program',
            link: 'https://kmdr.sh/',
            options: [
                {
                    name: 'version',
                    short: ['-v'],
                    summary: 'shows verssion',
                },
                {
                    name: 'help',
                    short: ['-h'],
                    long: ['--help'],
                    summary: 'displays help',
                },
            ],
        };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
    test('one subcommand is provided', () => {
        const program = {
            name: 'docker-compose',
            summary: 'a docker program',
            link: 'https://kmdr.sh/',
            stickyOptions: false,
            subcommands: [
                {
                    name: 'up',
                    summary: 'starts or creates containers',
                    aliases: ['create'],
                    options: [
                        {
                            name: 'file',
                            short: ['-f'],
                            long: ['--file'],
                            summary: 'sets the file',
                        },
                    ],
                },
            ],
        };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
    test('subcommands with a nested subcommand', () => {
        const program = {
            name: 'docker-compose',
            summary: 'a docker program',
            link: 'https://kmdr.sh/',
            stickyOptions: false,
            subcommands: [
                {
                    name: 'up',
                    summary: 'starts or creates containers',
                    aliases: ['create'],
                    options: [
                        {
                            name: 'file',
                            short: ['-f'],
                            long: ['--file'],
                            summary: 'sets the file',
                        },
                    ],
                    subcommands: [
                        {
                            name: 'force',
                            summary: 'force creation',
                            options: [
                                {
                                    name: 'all',
                                    short: ['-a'],
                                    long: ['--all'],
                                    summary: 'All containers',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'down',
                    aliases: ['d'],
                    summary: 'stops the containers',
                    options: [
                        {
                            name: 'destroy',
                            short: ['-d'],
                            long: ['--destroy'],
                            summary: 'destroy the container',
                        },
                    ],
                    subcommands: [
                        {
                            name: 'force',
                            summary: 'force creation',
                            options: [
                                {
                                    name: 'all',
                                    short: ['-a'],
                                    long: ['--all'],
                                    summary: 'All containers',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        const programSchema = new program_1.default(program);
        expect(programSchema).toMatchObject(program);
    });
});
//# sourceMappingURL=program.test.js.map