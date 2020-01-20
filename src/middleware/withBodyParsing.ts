import { Handler, HandlerResult, HandlerArgs } from "~/rest";
import { decode } from "~/utils/json";

export const withBodyParsing = (h: Handler) => async (
  args: HandlerArgs
): Promise<HandlerResult> => {
  return h({ ...args, body: decode(args.event.body) });
};
