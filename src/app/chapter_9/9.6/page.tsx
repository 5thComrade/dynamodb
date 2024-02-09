import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";

export default function Chapter_9_6() {
  return (
    <main>
      <PageTitle>9.6: Shorten attribute names to save storage</PageTitle>
      <Paragraph>
        Above, I mentioned you shouldn’t reuse indexing attributes even if it
        would save you money due to the confusion it adds. However, there is a
        different approach you can take to save on storage. This is a pretty
        advanced pattern that I would recommend only for the largest tables and
        for those that are heavily into the DynamoDB mindset.
      </Paragraph>

      <Paragraph>
        You can abbreviate your attribute names when saving items to DynamoDB to
        reduce storage costs. For example, imagine the following code to save a
        User in your application:
      </Paragraph>

      <CodeBlock>
        <>{`
        import { PutCommand } from "@aws-sdk/lib-dynamodb";
        import ddbDocClient from "@/lib/clients/dynamoDBClient";
        import { dbName } from "@/lib/constants";

        const dbCommand = new PutCommand({
          TableName: dbName,
          Item: {
            pk: "CUSTOMERS",
            sk: "CUSTOMER#{parseResult.output.customer.phone}"",
            fn: parseResult.output.customer.firstName,
            ln: parseResult.output.customer.lastName,
            ph: parseResult.output.customer.phone,
            email: parseResult.output.customer.email,
            zip: parseResult.output.customer.zipcode,
          },
          ConditionExpression: "attribute_not_exists(#phone_key)",
          ExpressionAttributeNames: {
            "#phone_key": "ph"
          }
        });

        const dbResponse = await ddbDocClient.send(dbCommand);
        `}</>
      </CodeBlock>

      <Paragraph>
        {`Notice how the application attributes are abbreviated when calling the
        PutItem operation. "FirstName" attribute has been shortened to "fn", "LastName" attribute has been shortened to "ln" etc`}
      </Paragraph>

      <Paragraph>
        Because your application will never be touching these abbreviated names,
        it’s safe to make these abbreviations. When retrieving the User item
        from your table, you’ll need to rehydrate your User object. That will
        convert the shortened attribute names to the more meaningful names to
        make it easy to use in your application.
      </Paragraph>

      <Footer previous="/chapter_9/9.5" next="/chapter_10" />
    </main>
  );
}
