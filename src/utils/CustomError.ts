export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    // Set the prototype explicitly to ensure correct behavior when extending built-in objects in TS
    Object.setPrototypeOf(this, CustomError.prototype);

    // Captures the stack trace, excluding the constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }
}
