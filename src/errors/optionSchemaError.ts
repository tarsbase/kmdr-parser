class OptionSchemaError extends Error {
  constructor(message: any) {
    super(message);
    this.name = 'OptionSchemaError';
  }
}

export default OptionSchemaError;
