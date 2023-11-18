import { type NextRequest, NextResponse } from "next/server";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { string, safeParse } from "valibot";
import ddbDocClient from "@/lib/clients/dynamoDBClient";
import { dbName } from "@/lib/constants";

export async function GET(request: NextRequest) {
  try {
    const zipcode = request.nextUrl.searchParams.get("zipcode");

    const parsedZipcode = safeParse(string(), zipcode);

    if (parsedZipcode.success) {
      const dbCommand = new QueryCommand({
        TableName: dbName,
        KeyConditionExpression: "#pk_key = :pk_value",
        FilterExpression: "#zip_key = :zip_value",
        ExpressionAttributeNames: {
          "#pk_key": "pk",
          "#zip_key": "zipcode",
        },
        ExpressionAttributeValues: {
          ":pk_value": "CUSTOMERS",
          ":zip_value": `${parsedZipcode.output}`,
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
    } else {
      throw new Error("Request schema validation failed.");
    }
  } catch (err) {
    console.log(err);
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
