import * as t from "io-ts";
import { encode } from "~/utils/json";

export function withDefault<T extends t.Mixed>(
  type: T,
  defaultValue: t.TypeOf<T>
): t.Type<t.TypeOf<T>, t.TypeOf<T>, unknown> {
  return new t.Type(
    `withDefault(${type.name}, ${encode(defaultValue)})`,
    type.is,
    v => type.decode(v != null ? v : defaultValue),
    type.encode
  );
}
