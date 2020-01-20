import * as t from "io-ts";
import shortid from "shortid";
import { JSONValue, JSONObject } from "~/utils/json";

const Id = t.type({
  id: t.string
});

type Id = t.TypeOf<typeof Id>;

export { Id };

export const withId = () => (body: JSONValue): JSONObject => {
  return {
    ...(body as JSONObject),
    id: shortid.generate()
  };
};
