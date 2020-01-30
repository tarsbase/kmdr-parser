/**
 * Copyright 2019 Eddie Ramirez
 */

import { Option } from "../src/option";
import { ERROR_MESSAGES } from "../src/contants";

describe("An Option Schema cannot be created when", () => {
  test("the summary field is empty", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "          "
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_STRING);
  });

  test("long and short options are missing", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "Short summary"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_EMPTY);
  });

  test("short contains a value that is not a list of string", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "Soemthing",
        short: "-f"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test("long contains a value that is not a list of strings", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "Something",
        long: 123
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test("short is valid but long is invalid", () => {
    expect(() => {
      const newOption = new Option({
        long: false,
        name: "test",
        short: ["-f"],
        summary: "A test"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test("long is valid but short is invalid", () => {
    expect(() => {
      const newOption = new Option({
        long: ["--something"],
        name: "name",
        short: 12,
        summary: "Summary"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_ARRAY);
  });

  test("expectsArg contains a non-boolean value", () => {
    expect(() => {
      const newOption = new Option({
        expectsArg: "",
        name: "name",
        short: ["-a"],
        summary: "Summary"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_BOOLEAN);
  });

  test("description contains a value that is not a string", () => {
    expect(() => {
      const newOption = new Option({
        description: [1, 2, 3],
        name: "name",
        short: ["-a"],
        summary: "Summary"
      } as any);
    }).toThrow(ERROR_MESSAGES.FIELD_NOT_STRING);
  });
});

describe("An Option schema is created when", () => {
  test("at least a short option is provided", () => {
    const option = { name: "name", summary: "Summary", short: ["-a"] };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });

  test("at least a long option is provided", () => {
    const option = { name: "name", summary: "Summary", long: ["--long"] };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });

  test("long and short options are provided", () => {
    const option = {
      name: "name",
      summary: "Ssummary",
      long: ["--long"],
      short: ["-a"]
    };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });
});
