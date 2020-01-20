import { isDevelopment } from "./environment";

export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue } | object;
export interface JSONArray extends Array<JSONValue> {}

export const encode = isDevelopment
  ? (body: JSONValue) => JSON.stringify(body, null, 2)
  : JSON.stringify;

export const decode = JSON.parse;
