import * as t from "io-ts";

export function withGenerator<T extends t.Mixed>(
  type: T,
  generator: () => t.TypeOf<T>
): t.Type<t.TypeOf<T>, t.TypeOf<T>, unknown> {
  return new t.Type(
    `withGenerator(${type.name})`,
    type.is,
    v => type.decode(v != null ? v : generator()),
    type.encode
  );
}
