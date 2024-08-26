import { ErrorCode } from "./error-code";

export interface ErrorResponse {
  message: string | undefined;
  errorCode: ErrorCode | undefined;
  errors: Map<string, string> | undefined;
}
