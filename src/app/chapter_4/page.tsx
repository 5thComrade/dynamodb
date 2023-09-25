import { PageTitle, Paragraph } from "@/components/custom/Typography";
import CodeBlock from "@/components/custom/CodeBlock";
import Footer from "@/components/custom/Footer";
import InputMessage from "./_components/InputMessage";

export default function Chapter_4() {
  return (
    <main>
      <PageTitle>Chapter 4: The Three API Action Types</PageTitle>
      <Paragraph>
        You usually interact with DynamoDB by using the AWS SDK or a third-party
        library in your programming language of choice. These SDKs expose a few
        API methods to write to and read from your DynamoDB table.
      </Paragraph>

      <Paragraph>
        Well lets start using the AWS SDK to add a message to the DynamoDB
        Table.
      </Paragraph>

      <InputMessage />

      <Paragraph className="mt-4 text-sm text-yellow-500">
        Refer the code below: This is a high level overview of using the AWS SDK
        and the DynamoDB Client to save a message in the table.
      </Paragraph>

      <CodeBlock>
        <>
          {`
          import { PutCommand } from "@aws-sdk/lib-dynamodb";
          import ddbDocClient from "@/lib/clients/dynamoDBClient";
          import { dbName } from "@/lib/constants";

          const dbCommand = new PutCommand({
              TableName: dbName,
              Item: {
                pk: "message",
                sk: "MESSAGE#1",
                message: requestBody.message,
              },
          });

          const dbResponse = await ddbDocClient.send(dbCommand);
        `}
        </>
      </CodeBlock>

      <Paragraph className="mt-4 text-sm text-yellow-500">
        If you looking for an in-depth understanding of how we added the message
        to the table, refer to the following file-path.
      </Paragraph>

      <CodeBlock>
        {`
          src/app/api/message/route.ts
        `}
      </CodeBlock>

      <Paragraph className="mb-3">
        In this chapter, we’ll learn about the core API actions with DynamoDB.
        The API for DynamoDB is small but powerful. This makes it easy to learn
        the core actions while still providing a flexible way to model and
        interact with your data.
      </Paragraph>
      <Paragraph>1: Item-based actions</Paragraph>
      <Paragraph>2: Queries</Paragraph>
      <Paragraph>3: Scans</Paragraph>

      <Paragraph className="mt-4">
        The API actions are divided based on what you’re operating on. Operating
        on specific items? Use the item-based actions. Operating on an item
        collection? Use a Query. Operating on the whole table? Use a Scan.
      </Paragraph>
      <Footer previous="/chapter_3/3.6" next="/chapter_4/4.1" />
    </main>
  );
}
