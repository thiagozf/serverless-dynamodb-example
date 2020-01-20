import { JSONValue } from "~/utils/json";
import { HandlerResult } from "./handler";

type Response = (body?: JSONValue) => HandlerResult;

export const withStatus = (statusCode: number) => (body: JSONValue) => {
  return {
    statusCode,
    body
  };
};

export const badRequest: Response = withStatus(400);

export const unprocessableEntity: Response = withStatus(422);

export const created: Response = withStatus(201);

export const ok: Response = withStatus(200);

export const notFound: Response = withStatus(404);
