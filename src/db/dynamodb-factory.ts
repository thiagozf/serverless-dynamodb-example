import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoConfig } from "./dynamodb-config";
import { isTest, isOffline } from "~/utils/environment";

const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env"
  }),
  ...(isOffline && /* istanbul ignore next */ {
    region: "localhost",
    endpoint: `http://localhost:8000`,
    accessKeyId: "MOCK_ACCESS_KEY_ID",
    secretAccessKey: "MOCK_SECRET_ACCESS_KEY"
  })
};

export const dynamoConfigFactory = (): DynamoConfig => {
  const documentClient = new DocumentClient(config);
  const tableName = process.env.DYNAMODB_TABLE || "local-way-pages-api-table";
  return { documentClient, tableName };
};
