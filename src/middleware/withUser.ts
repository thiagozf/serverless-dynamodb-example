import { Handler, HandlerResult, HandlerArgs } from "~/rest";

export const withUser = (h: Handler) => async (
  args: HandlerArgs
): Promise<HandlerResult> => {
  return h({ ...args, user: args.event.requestContext?.identity?.cognitoIdentityId });
};
