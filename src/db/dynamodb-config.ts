import { DocumentClient } from "aws-sdk/clients/dynamodb";

export type DynamoConfig = {
  documentClient: DocumentClient;
  tableName: string;
};
