/**
 * Copyright 2019 Eddie Ramirez
 */

import { Program } from "../src/program";
import { ERROR_MESSAGES } from "../src/contants";

describe("A Program Schema cannot be created when", () => {
  test('the name key is not provided, a  "Schema name cannot be empty" error is thrown', () => {
    expect(() => {
      new Program({ name: "" } as any);
    }).toThrowError(/non-empty/);
  });

  test('the name "wrong Name" contains incompatible characters, a "Schema name can only have letters..." error is thrown', () => {
    expect(() => {
      new Program({ name: "wrong Name" } as any);
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_VALID_CHARACTERS);
  });
  test('the summary key is not provided, a "Schema summary cannot be empty" error is thrown', () => {
    expect(() => {
      new Program({ name: "test", summary: "" });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_STRING);
  });

  test('the link is wrong, a "Schema link is invalid" error is thrown', () => {
    expect(() => {
      new Program({ name: "test", summary: "Summary", link: "http/wronglink" });
    }).toThrowError(ERROR_MESSAGES.FIELD_INVALID_LINK);
  });

  test('the stickyOptions is not boolean, "Schema stickyOptions must be of type boolean" error is thrown', () => {
    expect(() => {
      new Program(<any>{
        name: "test",
        summary: "Test",
        stickyOptions: "saddsa"
      });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_BOOLEAN);
  });

  test('the subcommands value is not an array, "Schema subcommands must be an array of subcommands" error is thrown', () => {
    expect(() => {
      new Program(<any>{
        name: "test",
        summary: "Test",
        subcommands: "wrong value"
      });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test('the options value is not an array, "Schema options must be an array of options" error is thrown', () => {
    expect(() => {
      new Program(<any>{ name: "test", summary: "Test", options: 12 });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test('the description value is not a string, "Schema description must be a string" error is thrown', () => {
    expect(() => {
      new Program(<any>{ name: "test", summary: "Test", description: [] });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_STRING);
  });
});

describe("A schema is created when", () => {
  test("the name and summary are provided", () => {
    const program = { name: "docker-compose", summary: "A docker program" };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("a valid link is provided", () => {
    const program = {
      name: "docker-compose",
      summary: "A docker program",
      link: "https://kmdr.sh/"
    };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("one option is provided", () => {
    const program = {
      name: "docker-compose",
      summary: "A docker program",
      link: "https://kmdr.sh/",
      options: [{ name: "version", short: ["-v"], summary: "Shows verssion" }]
    };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("two options are provided", () => {
    const program = {
      name: "docker-compose",
      summary: "Docker program",
      link: "https://kmdr.sh/",
      options: [
        {
          name: "version",
          short: ["-v"],
          summary: "Shows verssion"
        },
        {
          name: "help",
          short: ["-h"],
          long: ["--help"],
          summary: "Displays help"
        }
      ]
    };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("one subcommand is provided", () => {
    const program = {
      name: "docker-compose",
      summary: "A docker program",
      link: "https://kmdr.sh/",
      subcommands: [
        {
          name: "up",
          summary: "Starts or creates containers",
          aliases: ["create"],
          options: [
            {
              name: "file",
              short: ["-f"],
              long: ["--file"],
              summary: "Sets the file"
            }
          ]
        }
      ]
    };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("subcommands with a nested subcommand", () => {
    const program = {
      name: "docker-compose",
      summary: "A docker program",
      link: "https://kmdr.sh/",
      subcommands: [
        {
          name: "up",
          summary: "Starts or creates containers",
          aliases: ["create"],
          options: [
            {
              name: "file",
              short: ["-f"],
              long: ["--file"],
              summary: "Sets the file"
            }
          ],
          subcommands: [
            {
              name: "force",
              summary: "Force creation",
              options: [
                {
                  name: "all",
                  short: ["-a"],
                  long: ["--all"],
                  summary: "All containers"
                }
              ]
            }
          ]
        },
        {
          name: "down",
          aliases: ["d"],
          summary: "Stops the containers",
          options: [
            {
              name: "destroy",
              short: ["-d"],
              long: ["--destroy"],
              summary: "Destroy the container"
            }
          ],
          subcommands: [
            {
              name: "force",
              summary: "Force creation",
              options: [
                {
                  name: "all",
                  short: ["-a"],
                  long: ["--all"],
                  summary: "All containers"
                }
              ]
            }
          ]
        }
      ]
    };
    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });

  test("a program with valid examples", () => {
    const program = {
      name: "kmdr",
      summary: "The ultimate CLI learning too",
      examples: [
        {
          summary: "Explain a command",
          command: "kmdr explain"
        }
      ]
    };

    const programSchema = new Program(program);
    expect(programSchema).toMatchObject(program);
  });
});
