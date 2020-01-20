import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DeepPartial } from "~/utils/types";
import { dynamoConfigFactory } from "~/db/dynamodb-factory";
import { Page } from "./pages-model";

const { documentClient, tableName } = dynamoConfigFactory();

const getPK = (tenant: string, id: string) => `${tenant}:Page:${id}`;

const getSK = (tenant: string) => `${tenant}:Page`;

const getGSI_SK = (name: string) => name;

export const createPage = async (data: DeepPartial<Page>): Promise<Page> => {
  const params = {
    TableName: tableName,
    Item: {
      PK: getPK(data.tenant, data.id),
      SK: getSK(data.tenant),
      GSI_SK: getGSI_SK(data.name),
      ...data
    }
  };

  await documentClient.put(params).promise();

  return data as Page;
};

export const updatePage = async (
  tenant: string,
  id: string,
  data: DeepPartial<Page>
): Promise<Page> => {
  const params = {
    TableName: tableName,
    Key: {
      PK: getPK(tenant, id),
      SK: getSK(tenant)
    },
    UpdateExpression:
      "SET #nm = :name, " +
      "content = :content, " +
      "#st = :status, " +
      "updatedBy = :updatedBy, " +
      "updatedAt = :updatedAt, " +
      "GSI_SK = :GSI_SK",
    ExpressionAttributeValues: {
      ":GSI_SK": getGSI_SK(data.name),
      ":name": data.name,
      ":status": data.status,
      ":updatedBy": data.updatedBy,
      ":updatedAt": data.updatedAt,
      ":content": data.content || null
    },
    ExpressionAttributeNames: {
      "#nm": "name",
      "#st": "status"
    },
    ReturnValues: "ALL_NEW"
  };

  const { Attributes } = await documentClient.update(params).promise();

  return Attributes as Page;
};

export const getPageById = async (
  tenant: string,
  id: string
): Promise<Page> => {
  const params: DocumentClient.GetItemInput = {
    TableName: tableName,
    Key: {
      PK: getPK(tenant, id),
      SK: getSK(tenant)
    }
  };

  const { Item } = await documentClient.get(params).promise();

  return Item as Page;
};

export const getPages = async (tenant: string): Promise<Page[]> => {
  const params: DocumentClient.QueryInput = {
    TableName: tableName,
    KeyConditionExpression: "SK = :SK",
    IndexName: "GSI_1",
    ExpressionAttributeValues: {
      ":SK": getSK(tenant)
    }
  };

  const { Items } = await documentClient.query(params).promise();

  return Items as Page[];
};
