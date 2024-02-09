import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_9_2() {
  return (
    <main>
      <PageTitle>
        9.2: Implement your data model at the very boundary of your application
      </PageTitle>
      <Paragraph>
        {`In the previous example, we printed out the customers that were saved in
        the DynamoDb table. The response includes the indexing attributes and if
        you are not using "@aws-sdk/lib-dynamodb" you'll notice that each attribute value is a map with a single key and value indicating the DynamoDB type and the value for the attribute.`}
      </Paragraph>

      <Paragraph>
        Both of these facts will make it messy to work with DynamoDB items in
        the business logic portion of your application. You’ll be grabbing
        nested properties, performing proper type conversions, and adding
        indexing attributes before saving your items.
      </Paragraph>

      <Paragraph>
        {`To avoid this problem, implement your data model at the boundary of your
        application. Within the core of your application, your application
        objects should have the main attributes that are relevant to your
        business logic. For example, if you have a function called getUser('userId') the returned value from this function is a User object that is meaningful and useful to my application.`}
      </Paragraph>

      <Paragraph>
        All interaction with DynamoDB should be handled in the data module that
        is at the boundary of your application.
      </Paragraph>
      <Footer previous="/chapter_9/9.1" next="/chapter_9/9.3" />
    </main>
  );
}
