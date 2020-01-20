export class ValidationError extends Error {
  readonly errors: string[];

  constructor(errors: string[]) {
    super(errors.join("\n"));
    this.errors = errors;
  }
}
