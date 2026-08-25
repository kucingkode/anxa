export class DomainError extends Error {
  code?: string;

  constructor(message?: string, code?: string, cause?: unknown) {
    super(message, {
      cause,
    });

    this.code = code;
  }
}
