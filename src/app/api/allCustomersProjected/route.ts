import { NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import ddbDocClient from "@/lib/clients/dynamoDBClient";
import { dbName } from "@/lib/constants";

export async function GET() {
  try {
    const dbCommand = new QueryCommand({
      TableName: dbName,
      KeyConditionExpression: "#pk_key = :pk_value",
      ProjectionExpression:
        "#pk_key, #sk_key, #firstName_key, #lastName_key, #phone_key",
      ExpressionAttributeNames: {
        "#pk_key": "pk",
        "#sk_key": "sk",
        "#firstName_key": "firstName",
        "#lastName_key": "lastName",
        "#phone_key": "phone",
      },
      ExpressionAttributeValues: {
        ":pk_value": "CUSTOMERS",
      },
    });

    const dbResponse = await ddbDocClient.send(dbCommand);

    if (dbResponse.$metadata.httpStatusCode === 200) {
      return NextResponse.json(
        {
          count: dbResponse.Count,
          scannedCount: dbResponse.ScannedCount,
          items: dbResponse.Items,
        },
        {
          status: 200,
        }
      );
    } else {
      throw new Error("DB QueryCommand failed!", {
        cause: dbResponse,
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "Request failed!",
      },
      {
        status: 400,
      }
    );
  }
}
