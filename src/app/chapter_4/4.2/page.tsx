import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";
import GetMessages from "../_components/GetMessages";
import NoteBlock from "@/components/custom/NoteBlock";

export default function chapter_4_2() {
  return (
    <main>
      <PageTitle>4.2: Query</PageTitle>
      <Paragraph>
        The Query API action lets you retrieve multiple items with the same
        partition key. You can use the Query API to easily fetch all related
        objects in a one-to-many relationship or a many-to-many relationship.
      </Paragraph>
      <Paragraph>
        You can use the Query operation on either your base table or a secondary
        index. When making a Query, you must include a partition key in your
        request.
      </Paragraph>

      <NoteBlock />

      <GetMessages />

      <Paragraph className="mt-4 text-sm text-yellow-500">
        Refer the code below: This is a high level overview of using the AWS SDK
        and the DynamoDB Client to get all the messages from the table.
      </Paragraph>

      <CodeBlock>
        <>
          {`
            import { QueryCommand } from "@aws-sdk/lib-dynamodb";
            import ddbDocClient from "@/lib/clients/dynamoDBClient";
            import { dbName } from "@/lib/constants";

            const dbCommand = new QueryCommand({
                  TableName: dbName,
                  KeyConditionExpression: "#pk_key = :pk_value",
                  ExpressionAttributeNames: {
                      "#pk_key": "pk",
                  },
                  ExpressionAttributeValues: {
                      ":pk_value": "message",
                  },
            });

            const dbResponse = await ddbDocClient.send(dbCommand);
          `}
        </>
      </CodeBlock>

      <Paragraph>
        The Query would return all the messages that you have added earlier. The
        Query operation is how you efficiently read items in an item collection.
      </Paragraph>

      <Paragraph>
        You can also query a secondary index, just add the IndexName property to
        the QueryCommand.
      </Paragraph>

      <Footer previous="/chapter_4/4.1" next="/chapter_4/4.3" />
    </main>
  );
}
