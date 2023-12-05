import { type NextRequest, NextResponse } from "next/server";
import { string, safeParse, object, optional } from "valibot";
import { PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import ddbDocClient from "@/lib/clients/dynamoDBClient";
import { dbName } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const RequestBodySchema = object({
    customer: object({
      firstName: string(),
      lastName: string(),
      phone: string(),
      email: string(),
      zipcode: string(),
    }),
  });

  try {
    const reqBody = await request.json();

    const parseResult = safeParse(RequestBodySchema, reqBody);

    if (parseResult.success) {
      const dbCommand = new PutCommand({
        TableName: dbName,
        Item: {
          pk: "CUSTOMERS",
          sk: `CUSTOMER#${parseResult.output.customer.phone}`,
          firstName: parseResult.output.customer.firstName,
          lastName: parseResult.output.customer.lastName,
          phone: parseResult.output.customer.phone,
          email: parseResult.output.customer.email,
          zipcode: parseResult.output.customer.zipcode,
        },
        ConditionExpression: "attribute_not_exists(#phone_key)",
        ExpressionAttributeNames: {
          "#phone_key": "phone",
        },
      });

      const dbResponse = await ddbDocClient.send(dbCommand);

      if (dbResponse.$metadata.httpStatusCode === 200) {
        return NextResponse.json(
          {
            message: "Customer saved successfully!",
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

export async function GET(request: NextRequest) {
  try {
    const phone = request.nextUrl.searchParams.get("phone");

    const parsedPhone = safeParse(string(), phone);

    if (parsedPhone.success) {
      const dbCommand = new QueryCommand({
        TableName: dbName,
        KeyConditionExpression: "#pk_key = :pk_value AND #sk_key = :sk_value",
        ExpressionAttributeNames: {
          "#pk_key": "pk",
          "#sk_key": "sk",
        },
        ExpressionAttributeValues: {
          ":pk_value": "CUSTOMERS",
          ":sk_value": `CUSTOMER#${parsedPhone.output}`,
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

export async function PATCH(request: NextRequest) {
  const RequestBodySchema = object({
    customer: object({
      phone: string(),
      updates: object({
        firstName: optional(string()),
        lastName: optional(string()),
        email: optional(string()),
        zipcode: optional(string()),
      }),
    }),
  });

  try {
    const reqBody = await request.json();

    const parseResult = safeParse(RequestBodySchema, reqBody);

    if (parseResult.success) {
      // dynamically generating an update expression based on the request body
      const updateExpression = Object.entries(
        parseResult.output.customer.updates
      ).reduce(
        (prevValue, [key, value]) => {
          if (value) {
            return {
              UpdateExpression:
                prevValue.UpdateExpression + ` #${key} = :${key},`,
              ExpressionAttributeNames: {
                ...prevValue.ExpressionAttributeNames,
                [`#${key}`]: key,
              },
              ExpressionAttributeValues: {
                ...prevValue.ExpressionAttributeValues,
                [`:${key}`]: value,
              },
            };
          } else {
            return prevValue;
          }
        },
        {
          UpdateExpression: "SET",
          ExpressionAttributeNames: {
            "#sk_key": "sk",
          },
          ExpressionAttributeValues: {},
        }
      );

      updateExpression.UpdateExpression =
        updateExpression.UpdateExpression.slice(0, -1);

      const dbCommand = new UpdateCommand({
        TableName: dbName,
        Key: {
          pk: "CUSTOMERS",
          sk: `CUSTOMER#${parseResult.output.customer.phone}`,
        },
        ConditionExpression: "attribute_exists(#sk_key)", // update only when a customer with the phone number exists
        ...updateExpression,
      });

      const dbResponse = await ddbDocClient.send(dbCommand);

      if (dbResponse.$metadata.httpStatusCode === 200) {
        return NextResponse.json(
          {
            message: "Customer updated successfully!",
          },
          {
            status: 201,
          }
        );
      } else {
        throw new Error("DB UpdateCommand failed!", {
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
