/**
 * Copyright 2019 Eddie Ramirez
 */

import { Subcommand } from "../src/subcommand";
import { ERROR_MESSAGES } from "../src/contants";

describe("A Subcommand schema cannot be created when", () => {
  test('the name key is not provided, a "Subcommand schema name cannot be empty" error is thrown', () => {
    expect(() => {
      new Subcommand(<any>{});
    }).toThrowError(ERROR_MESSAGES.FIELD_EMPTY);
  });

  test('the name "as#12?" contains incompatible characters, a "Subcommand schema name contains incompatible characters" error is thrown', () => {
    expect(() => {
      new Subcommand(<any>{ name: "as#12?" });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_VALID_CHARACTERS);
  });

  test('the summary key is not provided, a "Subcommand schema summary cannot be empty" error is thrown', () => {
    expect(() => {
      new Subcommand(<any>{ name: "test", summary: "" });
    }).toThrowError(ERROR_MESSAGES.FIELD_NOT_STRING);
  });

  test('the aliases key is not an array of strings, a "Subcommand schema aliases must be an array of strings"', () => {
    expect(() => {
      new Subcommand(<any>{
        name: "test",
        summary: "test",
        aliases: "something wrong"
      });
    });
  });
});

describe("A subcommand schema is created when", () => {
  test("the name and summary are provide", () => {
    const subcommand = { name: "subcommand", summary: "a subcommand" };
    expect(new Subcommand(subcommand, ["program"])).toMatchObject(subcommand);
  });
});
