import SchemaValidator from "../src/schemaValidator";

describe("Schema validator functions", () => {
  test("Word does end with a letter", () => {
    expect(SchemaValidator.endsWithLetter("test")).toBeTruthy();
  });

  test("Word ends with a non-letter character", () => {
    expect(SchemaValidator.endsWithLetter("test.")).toBeFalsy();
  });

  test("Word of only spaces is an empty string", () => {
    expect(SchemaValidator.isEmpty("          ")).toBeTruthy();
  });
});
