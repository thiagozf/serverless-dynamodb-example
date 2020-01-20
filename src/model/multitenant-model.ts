import * as t from "io-ts";
import { JSONObject, JSONValue } from "~/utils/json";

const Tenancy = t.type({
  tenant: t.string
});

type Tenancy = t.TypeOf<typeof Tenancy>;

export { Tenancy };

export const withTenant = (tenant: string) => (body: JSONValue): JSONObject => {
  return {
    ...(body as JSONObject),
    tenant
  };
};
