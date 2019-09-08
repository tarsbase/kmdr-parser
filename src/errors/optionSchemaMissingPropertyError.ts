import OptionSchemaError from './optionSchemaError';

class OptionSchemaMissingPropertyError extends OptionSchemaError {
  constructor(property: string, optionSchema: any) {
    super(`Property '${property}' missing from Option Schema ${optionSchema.toString()}`);
    this.name = 'OptionSchemaMissingPropertyError';
  }
}

export default OptionSchemaMissingPropertyError;
