/**
 * Copyright 2019 Eddie Ramirez
 */

import { Command } from "../src/command";

describe("Cannot create a command example if", () => {
  test("Summary is an empty string", () => {
    expect(() => {
      const newCommand = new Command({ summary: "", command: "asdf" });
    }).toThrowError("Command example summary cannot be an empty string");
  });

  test("command is an empty string", () => {
    expect(() => {
      const newCommand = new Command({ summary: "test", command: "" } as any);
    }).toThrowError("Command example cannot be an empty string");
  });
});

describe("A command example is created when", () => {
  test("summary and a command are non-empty string", () => {
    expect(() => {
      const command = { summary: "List all files", command: "ls -a" };
      const newCommand = new Command(command);
      expect(command).toMatchObject(newCommand);
    });
  });
});
