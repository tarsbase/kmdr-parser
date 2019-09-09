import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import Schema from "./schema";

class Parser {
  public filename: string;

  constructor(filename: string) {
    this.filename = filename;
    const extName = path.extname(filename);

    switch (extName) {
      case ".json": {
        this.openJSON(filename);
        break;
      }
      case ".yaml":
      case ".yml": {
        this.openYAML(filename);
        break;
      }

      default: {
        console.error("Only JSON or YAML formats are supported");
      }
    }
  }

  openJSON(filename: string) {
    const fileContents = fs.readFileSync(filename, "utf8");
    const json = JSON.parse(fileContents);
  }

  openYAML(filename: string) {
    // Get document, or throw exception on error
    try {
      const yamlContents = yaml.safeLoad(fs.readFileSync(filename, "utf8"));
      const schema = new Schema(yamlContents);
    } catch (e) {
      console.log(e);
    }
  }
}

export default Parser;
