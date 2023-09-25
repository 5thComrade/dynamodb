import { type NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { string, safeParse, object } from "valibot";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import ddbDocClient from "@/lib/clients/dynamoDBClient";
import { dbName } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const RequestBodySchema = object({
    message: string(),
  });

  try {
    const reqBody = await request.json();

    const parseResult = safeParse(RequestBodySchema, reqBody);

    if (parseResult.success) {
      const dbCommand = new PutCommand({
        TableName: dbName,
        Item: {
          pk: "message",
          sk: `MESSAGE#${nanoid()}`,
          message: parseResult.output.message,
        },
      });

      const dbResponse = await ddbDocClient.send(dbCommand);

      if (dbResponse.$metadata.httpStatusCode === 200) {
        return NextResponse.json(
          {
            message: "Message saved successfully!",
          },
          {
            status: 201,
          }
        );
      } else {
        throw new Error("DB PutCommand failed!", {
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
