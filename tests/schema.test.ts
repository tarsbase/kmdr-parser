/**
 * Copyright 2019 Eddie Ramirez
 */

import Schema from "../src/schema";

describe("A Schema can be created when", () => {
  test("a name a summary are provided", () => {
    const schema = {
      name: "kmdr",
      summary: "Summary"
    };

    const newSchema = new Schema(schema);

    expect(newSchema).toBeTruthy();
  });
});

describe("The kmdr program", () => {
  let newSchema: Schema;

  beforeAll(() => {
    const schema = {
      name: "kmdr",
      subcommands: [
        {
          name: "test",
          summary: "Subcommand test"
        },
        {
          name: "uno",
          subcommands: [
            {
              name: "dos",
              subcommands: [
                {
                  name: "tres",
                  summary: "Subcommand tres"
                }
              ],
              summary: "Subcommand dos"
            }
          ],
          summary: "Subcommand uno"
        }
      ],
      summary: "Explain commands",
      examples: [
        {
          summary: "Example command",
          command: "kmdr uno"
        }
      ]
    };

    newSchema = new Schema(schema);
  });

  test('has a subcommand "test"', () => {
    expect(newSchema.hasSubcommand("test")).toBeTruthy();
  });

  test('does not have a subcommand "fake"', () => {
    expect(newSchema.hasSubcommand("fake")).toBeFalsy();
  });

  test('subcommand "uno" has a subcommand "dos"', () => {
    expect(newSchema.hasSubcommand("dos", ["kmdr", "uno"])).toBeTruthy();
  });

  test('subcommand "uno" does not have subcommand "tres"', () => {
    expect(newSchema.hasSubcommand("tres", ["kmdr", "uno"])).toBeFalsy();
  });

  test('subcommand dos has subcommand "tres"', () => {
    expect(newSchema.hasSubcommand("tres", ["kmdr", "uno", "dos"]));
  });

  xtest("outputs a valid JSON", () => {
    const expectedJSON =
      '{"name":"kmdr","summary":"Explain commands","description":"","version":"","link":"","locale":"en","subcommands":[{"name":"test","summary":"subcommand test","_path":["kmdr","test"],"stickyOptions":false},{"name":"uno","summary":"subcommand uno","_path":["kmdr","uno"],"stickyOptions":false,"subcommands":[{"name":"dos","summary":"subcommand dos","_path":["kmdr","uno","dos"],"stickyOptions":false,"subcommands":[{"name":"tres","summary":"subcommand tres","_path":["kmdr","uno","dos","tres"],"stickyOptions":false}]}]}],"examples":[{"command":"kmdr uno","summary":"example command"}]}';
    expect(expectedJSON).toEqual(newSchema.toJSON());
  });

  test("it has x options, x subcommands and x examples", () => {
    expect(newSchema.stats).toMatchObject({
      options: 0,
      subcommands: 4,
      examples: 1
    });
  });
});
