import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import Schema from "./schema";

class Parser {
  private filename: string;
  private dirname: string;
  private fileContents: any = {};

  constructor(file: string, options: object) {
    this.filename = path.basename(file);
    this.dirname = path.dirname(file);

    const extName = path.extname(file);

    switch (extName) {
      case ".json": {
        this.openJSON(path.normalize(file));
        break;
      }
      case ".yaml":
      case ".yml": {
        this.openYAML(path.normalize(file));
        break;
      }

      default: {
        console.error("Only JSON or YAML formats are supported");
      }
    }
  }

  public parse(): Schema {
    try {
      return new Schema(this.fileContents);
    } catch (err) {
      console.error(`Could not parse the file contents at ${this.filename}`);
      throw err;
    }
  }

  private openJSON(filename: string) {
    try {
      console.log(`Opening JSON file ${filename}`);
      const fileContents = fs.readFileSync(filename, "utf8");
      const json = JSON.parse(fileContents);
      this.fileContents = json;
    } catch (err) {
      console.error(`The schema ${filename} is invalid`);
      throw err;
    }
  }

  private openYAML(filename: string) {
    // Get document, or throw exception on error
    try {
      console.log(`Opening YAML file ${filename}`);
      const yamlContents = yaml.safeLoad(fs.readFileSync(filename, "utf8"));
      this.fileContents = yamlContents;
    } catch (err) {
      console.error(`The schema ${filename} is invalid`);
      throw err;
    }
  }
}

export default Parser;
