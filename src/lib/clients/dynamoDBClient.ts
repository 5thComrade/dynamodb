import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dbClient = new DynamoDBClient({
  region: process.env.TABLE_AWS_REGION,
  credentials: {
    accessKeyId: process.env.TABLE_AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.TABLE_AWS_SECRET_ACCESS_KEY as string,
  },
});

const dynamoDocClient = DynamoDBDocumentClient.from(dbClient);

export default dynamoDocClient;
