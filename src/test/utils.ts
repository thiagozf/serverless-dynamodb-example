import { JSONValue, encode } from "~/utils/json";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { dynamoConfigFactory } from "~/db/dynamodb-factory";

export const requestContext = {
  identity: {
    cognitoIdentityId: "user:thiagozf"
  }
};

export const withTestContext = (): Context => ({} as Context);

export const withTestEvent = (
  body: JSONValue = {},
  pathParameters: object = {}
): APIGatewayProxyEvent => {
  return {
    body: encode(body),
    pathParameters,
    requestContext
  } as APIGatewayProxyEvent;
};

export const clearTable = async () => {
  const { tableName, documentClient } = dynamoConfigFactory();

  const scanParams = { TableName: tableName };
  const scanResult = await documentClient.scan(scanParams).promise();

  if (!scanResult.Count) {
    return;
  }

  const params = {
    RequestItems: {
      [tableName]: scanResult.Items.map(d => ({
        DeleteRequest: {
          Key: {
            PK: d.PK,
            SK: d.SK
          }
        }
      }))
    }
  };

  await documentClient.batchWrite(params).promise();
};
