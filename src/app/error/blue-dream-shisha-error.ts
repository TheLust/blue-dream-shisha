import { ErrorResponse } from "./error-response";

export class BlueDreamShishaError extends Error {

  public errorResponse: ErrorResponse;

  constructor(errorResponse: ErrorResponse) {
    super();
    this.errorResponse = errorResponse;
  }
}
