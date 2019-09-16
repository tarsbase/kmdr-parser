import { Option } from "../src/option";

describe("An Option Schema cannot be created when", () => {
  test("the summary key is empty", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "          "
      } as any);
    }).toThrow(/Property 'summary' missing from/);
  });

  test("long and short options are missing", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "short summary"
      } as any);
    }).toThrow(/must have either a long or short option/);
  });

  test("short contains a value that is not a list of string", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "soemthing",
        short: "-f"
      } as any);
    }).toThrow(/long or short must be a list of string/);
  });

  test("long contains a value that is not a list of strings", () => {
    expect(() => {
      const newOption = new Option({
        name: "test",
        summary: "something",
        long: 123
      } as any);
    }).toThrow(/long or short must be a list of string/);
  });

  test("short is valid but long is invalid", () => {
    expect(() => {
      const newOption = new Option({
        long: false,
        name: "test",
        short: ["-f"],
        summary: "a test"
      } as any);
    }).toThrow();
  });

  test("long is valid but short is invalid", () => {
    expect(() => {
      const newOption = new Option({
        long: ["--something"],
        name: "name",
        short: 12,
        summary: "summary"
      } as any);
    }).toThrow();
  });

  test("expectsArg contains a non-boolean value", () => {
    expect(() => {
      const newOption = new Option({
        expectsArg: "",
        name: "name",
        short: ["-a"],
        summary: "summary"
      } as any);
    }).toThrow(/expectsArg must be a boolean value/);
  });

  test("description contains a value that is not a string", () => {
    expect(() => {
      const newOption = new Option({
        description: [1, 2, 3],
        name: "name",
        short: ["-a"],
        summary: "summary"
      } as any);
    }).toThrow(/description must be a string/);
  });
});

describe("An Option schema is created when", () => {
  test("at least a short option is provided", () => {
    const option = { name: "name", summary: "summary", short: ["-a"] };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });

  test("at least a long option is provided", () => {
    const option = { name: "name", summary: "summary", long: ["--long"] };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });

  test("long and short options are provided", () => {
    const option = {
      name: "name",
      summary: "summary",
      long: ["--long"],
      short: ["-a"]
    };
    const optionSchema = new Option(option);
    expect(optionSchema).toMatchObject(option);
  });
});
