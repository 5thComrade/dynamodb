import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";

export default function Chapter_9_3() {
  return (
    <main>
      <PageTitle>{`9.4: Add a 'Type' attribute to every item`}</PageTitle>
      <Paragraph>
        You’ll use different patterns for the primary key of each entity to
        distinguish between entity types. But it can be difficult to easily
        distinguish between this with a glance or when doing a filter
        expression.
      </Paragraph>

      <Paragraph>
        One tip I suggest is to include a Type attribute on every item I write
        to the table. This attribute will be a simple string declaring the type
        of entity: User, Order, SensorReading, etc.
      </Paragraph>

      <CodeBlock>
        {`
        {
            "PK": { "S": "USER#antonychiramel" },
            "SK": { "S": "USER#antonychiramel" },
            "GSI1PK": { "S": "ORG#facebook" },
            "GSI1SK": { "S": "USER#antonychiramel" },
            "Type": { "S": "User" },
            "Username": { "S": "antonychiramel" },
            "FirstName": { "S": "Antony" },
            "LastName": { "S": "Chiramel" },
            "OrganizationName": { "S": "Facebook" },
            ...
        }`}
      </CodeBlock>

      <Paragraph>
        {`In the above dataset we have added a "Type" attribute right below
        "GSI1SK"`}
      </Paragraph>

      <Paragraph>
        I use this attribute for a few things. First, as mentioned, it makes it
        easier to orient myself if I am exploring my table in the AWS console.
        But it’s more important for a few other situations.
      </Paragraph>

      <Paragraph>
        In the migration strategies discussed in Chapter 15, we discuss that you
        may need to modify existing items to decorate them with new indexing
        attributes. To do that, you do a background ETL operation that scans
        your table, finds the items you need to modify, and adds the attributes.
      </Paragraph>

      <Paragraph>
        When doing this, you usually only need to update certain entity types. I
        like to use a filter expression on the Type attribute when scanning my
        table to ensure I’m only getting the items that I need. It simplifies
        the logic in my ETL script.
      </Paragraph>

      <Paragraph>
        {`A final reason to add this Type attribute is for analytics reasons when
        you export your data to an external system. DynamoDB is not great at
        performing ad-hoc OLAP-style queries, so you will probably import your
        data to Amazon Redshift or export it to Amazon S3 to query with Amazon
        Athena. But all your entities will be in a single table, which is not
        how a relational database expects to use your data. After your initial
        export of data, you’ll want to "re- normalize" it by moving your
        different entity types into their own tables. Having a Type attribute
        makes it easier to write the transformation query and find the right
        items to move around.`}
      </Paragraph>

      <Footer previous="/chapter_9/9.3" next="/chapter_9/9.5" />
    </main>
  );
}
