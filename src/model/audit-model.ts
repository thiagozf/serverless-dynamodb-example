import * as t from "io-ts";
import { JSONObject, JSONValue } from "~/utils/json";

const Audit = t.intersection([
  t.type({
    name: t.string,
    createdAt: t.string,
    createdBy: t.string
  }),
  t.partial({
    updatedAt: t.string,
    updatedBy: t.string
  })
]);

type Audit = t.TypeOf<typeof Audit>;

export { Audit };

export const withCreated = (user: string) => (body: JSONValue): JSONObject => {
  return {
    ...(body as JSONObject),
    createdAt: new Date().toISOString(),
    createdBy: user
  };
};

export const withUpdated = (user: string) => (body: JSONValue): JSONObject => {
  return {
    ...(body as JSONObject),
    updatedAt: new Date().toISOString(),
    updatedBy: user
  };
};
