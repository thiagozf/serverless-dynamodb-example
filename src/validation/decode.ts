import * as t from "io-ts";
import { reporter } from "io-ts-reporters";
import { pipe } from "fp-ts/lib/pipeable";
import { fold } from "fp-ts/lib/Either";
import { ValidationError } from "./ValidationError";

// Apply a validator and get the result in a `Promise`
export const decode = <T, O, I>(
  validator: t.Type<T, O, I>,
  input: I
): Promise<T> => {
  const result = validator.decode(input);
  return pipe(
    result,
    fold(
      () => {
        return Promise.reject(new ValidationError(reporter(result)));
      },
      value => Promise.resolve(value)
    )
  );
};
