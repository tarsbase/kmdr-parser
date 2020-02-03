/**
 * Copyright 2019 Eddie Ramirez
 */

import { Command } from "../src/command";
import { ERROR_MESSAGES } from "../src/contants";

describe("Cannot create a command example if", () => {
  test("Summary is an empty string", () => {
    expect(() => {
      const newCommand = new Command({ summary: "", command: "asdf" });
    }).toThrowError(ERROR_MESSAGES.FIELD_EMPTY);
  });

  test("command is an empty string", () => {
    expect(() => {
      const newCommand = new Command({ summary: "test", command: "" } as any);
    }).toThrowError(ERROR_MESSAGES.FIELD_EMPTY);
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
