import { HandlerArgs } from "~/rest";
import { flow } from "fp-ts/lib/function";
import { withId } from "./id-model";
import { withUpdated, withCreated } from "./audit-model";
import { withTenant } from "./multitenant-model";

export const asUpdateData = (args: HandlerArgs) => {
  return flow(withUpdated(args.user))(args.body);
};

export const asCreateData = (args: HandlerArgs) => {
  return flow(
    withId(),
    withCreated(args.user),
    withTenant("ema") // TODO: resolve tenant ID from request?
  )(args.body);
};
