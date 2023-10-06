import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";

export default function chapter_5_1() {
  return (
    <main>
      <PageTitle>5.1: Learn how expression names and values work</PageTitle>
      <Paragraph>
        Expressions are necessary to efficiently query data in DynamoDB. Lets
        take a closer look at expressions using an example.
      </Paragraph>

      <CodeBlock>
        <>
          {`
            import { QueryCommand } from "@aws-sdk/lib-dynamodb";
            import ddbDocClient from "@/lib/clients/dynamoDBClient";
            import { dbName } from "@/lib/constants";

            const dbCommand = new QueryCommand({
                  TableName: dbName,
                  KeyConditionExpression: "#actor = :actor AND #movie BETWEEN :a AND :m",
                  ExpressionAttributeNames: {
                      "#actor": "Actor",
                      "#movie": "Movie"
                  },
                  ExpressionAttributeValues: {
                      ":actor": "Tom Hanks",
                      ":a": "A",
                      ":m": "M"
                  },
            });

            const dbResponse = await ddbDocClient.send(dbCommand);
          `}
        </>
      </CodeBlock>

      <Paragraph>
        {`Look at the KeyConditionExpression property. The first thing to note is that there are two types of placeholders.
        Some placeholders start with a #, like #actor and #movie, and other
        placeholders start with a ":", like :actor, :a, and :m.`}
      </Paragraph>

      <Paragraph>
        The ones that start with colons are your expression attribute values.
        They are used to represent the value of the attribute you are evaluating
        in your request.
      </Paragraph>

      <Paragraph>
        The values in the ExpressionAttributeValues property are substituted
        into our KeyConditionExpression by the DynamoDB server when it receives
        our request.
      </Paragraph>

      <Paragraph className="mt-4">
        Now let’s look at the placeholders that start with a #. These are your
        expression attribute names. These are used to specify the name of the
        attribute you are evaluating in your request. Like
        ExpressionAttributeValues, you’ll see that we have corresponding
        properties in our ExpressionAttributeNames parameter in the call.
      </Paragraph>

      <Paragraph className="mt-4">
        But why do we need this substitution? Why can’t we just write our
        attribute values/names directly into the expression?
      </Paragraph>

      <Paragraph className="mt-2">
        The most common reason is if your attribute name is a reserved word in
        DynamoDB. There are 573 reserved words in DynamoDB, and many of them
        will conflict with normal attribute names. For example, the following
        words are all reserved words that are commonly used as attribute names:
      </Paragraph>

      <Paragraph>- Bucket</Paragraph>
      <Paragraph>- By</Paragraph>
      <Paragraph>- Count</Paragraph>
      <Paragraph>- Month</Paragraph>
      <Paragraph>- Name</Paragraph>
      <Paragraph>- Timestamp</Paragraph>
      <Paragraph>- Timezone</Paragraph>

      <Paragraph className="mt-4">
        Because the list of reserved names is so long, I prefer not to check
        every time I’m writing an expression. In most cases, I’ll use
        ExpressionAttributeNames just to be safe.
      </Paragraph>

      <Footer previous="/chapter_5" next="/chapter_5/5.2" />
    </main>
  );
}
