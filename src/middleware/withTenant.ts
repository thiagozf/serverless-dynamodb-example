import { Handler, HandlerResult, HandlerArgs } from "~/rest";

export const withTenant = (h: Handler) => async (
  args: HandlerArgs
): Promise<HandlerResult> => {
  // TODO: resolve tenant from request
  return h({ ...args, tenant: "ema" });
};
