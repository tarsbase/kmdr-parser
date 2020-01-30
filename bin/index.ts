#!/usr/bin/env node
import commander from "commander";
import { Parser } from "../src/parser";
import {
  InvalidSchemaField,
  MissingSchemaField
} from "../src/errors/schemaError";
import util from "util";
import log4js from "log4js";

log4js.configure({
  appenders: {
    out: {
      type: "stdout",
      layout: {
        type: "pattern",
        pattern: "%[[%p]%] %m"
      }
    }
  },
  categories: { default: { appenders: ["out"], level: "info" } }
});

const pkgVersion = process.env["npm_package_version"] || "unknown";

class KmdrParserCli {
  private logger: log4js.Logger;

  constructor(logLevel: string = "info") {
    this.logger = log4js.getLogger();
    this.logger.level = "info";

    this.logger.level = logLevel;
  }

  parse(fileNames: string[]) {
    for (const name of fileNames) {
      this.logger.info(`Opening file ${name}...`);
      try {
        const parser = new Parser(name);
        const schema = parser.parse();

        if (schema.warnings.length > 0) {
          this.logger.warn(
            `The schema ${name} is VALID, but it has ${schema.warnings.length} warning(s)!`
          );

          for (const warningMsg of schema.warnings) {
            this.logger.warn(
              warningMsg.formattedMsg,
              util.inspect(warningMsg.value, { colors: true, compact: true })
            );
          }
        } else {
          this.logger.info(
            `The schema ${name} is VALID! It contains ${util.inspect(
              schema.stats,
              { colors: true }
            )}`
          );
        }
      } catch (err) {
        this.logger.error(`Error in ${name}`);

        if (err instanceof InvalidSchemaField) {
          const { schemaClass, field, message, path, schema } = err;
          const msg = `${schemaClass} ${field} at path ${
            path ? path.toString() : "undefined"
          }: ${message}`;

          this.logger.error(msg);
          this.logger.error(
            util.inspect(schema, {
              compact: false,
              depth: 0,
              breakLength: 80,
              colors: true
            })
          );
        } else if (err instanceof MissingSchemaField) {
          const { message, field, schema, schemaClass } = err;
          this.logger.error(`${schemaClass} ${field}: ${message}`);
        } else if (err instanceof SyntaxError) {
          this.logger.error(util.inspect(err));
        } else if (err.code === "ENOENT") {
          this.logger.error(`Could not find file ${name}`);
        } else {
          this.logger.error(err);
        }
      }
    }
  }
}

commander
  .version(pkgVersion, "-v, --version", "Output the current version")
  .option("-l, --log-level <level>", "Set the log level", "info")
  // .option("-w, --warnings", "Show validation warnings")
  .arguments("<file> [files...]");

commander.parse(process.argv);

const cli = new KmdrParserCli(commander.logLevel);
cli.parse(commander.args);
