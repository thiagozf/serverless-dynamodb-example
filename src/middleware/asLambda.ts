import { APIGatewayProxyResult, APIGatewayEvent, Context } from "aws-lambda";
import { encode } from "~/utils/json";
import { Handler, HandlerResult } from "~/rest";

export const asLambda = (h: Handler) => async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  const result: HandlerResult = await h({
    event,
    context
  });
  const resultBody = encode(result.body);
  return { ...result, body: resultBody };
};
