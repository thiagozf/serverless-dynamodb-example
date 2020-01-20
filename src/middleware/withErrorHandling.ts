import { flow } from "fp-ts/lib/function";
import { ClassType } from "~/utils/types";
import {
  Handler,
  unprocessableEntity,
  badRequest,
  HandlerResult,
  HandlerArgs
} from "~/rest";
import { ValidationError } from "~/validation";

type ErrorHandler = <E extends Error>(error: E) => Promise<HandlerResult>;

const raise = <E extends Error>(error: E): void => {
  throw error;
};

const rescue = <E extends Error, T extends ClassType<Error>>(
  error: E,
  type: T
) => (error instanceof type ? error : raise(error));

const handle = <E extends ClassType<Error>>(type: E) => (
  fail: ErrorHandler
) => (fn: Handler) => async (args: HandlerArgs) => {
  try {
    return await fn(args);
  } catch (error) {
    rescue(error, type);
    return await fail(error);
  }
};

const handleValidationError = handle(ValidationError)(async (error: Error) =>
  unprocessableEntity((error as ValidationError).errors)
);

const handleUnknownError = handle(Error)(async (error: Error) =>
  badRequest(error.message)
);

export const withErrorHandling = (
  errorHandling = flow(
    handleValidationError,
    handleUnknownError
  )
) => (handler: Handler): Handler => {
  return errorHandling(handler);
};
