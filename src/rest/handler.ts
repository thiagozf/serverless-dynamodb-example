import {
  APIGatewayEvent,
  Context as APIGatewayContext,
  APIGatewayProxyResult
} from "aws-lambda";
import { JSONValue } from "~/utils/json";
import {
  withErrorHandling,
  withUser,
  withTenant,
  asLambda
} from "~/middleware";
import { flow } from "fp-ts/lib/function";
import { withBodyParsing } from "~/middleware/withBodyParsing";

export type Context = APIGatewayContext;
export type Event = APIGatewayEvent;
// export type Event = Omit<APIGatewayEvent, "body"> & { body: JSONValue };
export type HandlerResult = Omit<APIGatewayProxyResult, "body"> & {
  body: JSONValue;
};

export interface HandlerArgs {
  event: Event;
  context: Context;
  user?: string;
  tenant?: string;
  body?: JSONValue;
}

export type Handler = (args: HandlerArgs) => Promise<HandlerResult>;

export const handler = flow(
  withErrorHandling(),
  withUser,
  withTenant,
  withBodyParsing,
  asLambda
);
