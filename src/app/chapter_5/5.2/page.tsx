import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_5_2() {
  return (
    <main>
      <PageTitle>5.2: Don’t use an ORM</PageTitle>
      <Paragraph>
        Object-relational mappers (ORMs) are popular tools when using relational
        databases in your application code. Rather than writing raw SQL
        statements, developers can use ORMs to operate directly on objects in
        their programming languages.
      </Paragraph>

      <Paragraph>
        I would not recommend using an ODM in DynamoDB (the NoSQL equivalent to
        ORMs is sometimes called an ODM, for Object-Document Mapper.)
      </Paragraph>

      <Paragraph className="my-4">
        First, ODMs push you to model data incorrectly. ORMs make some sense in
        a relational world because there’s a single way to model data. Each
        object type will get its own table, and relations are handled via
        foreign keys. Fetching related data involves following the foreign key
        relationships.
      </Paragraph>

      <Paragraph>
        This isn’t the case with DynamoDB. All of your object types are crammed
        into a single table, and sometimes you have multiple object types in a
        single DynamoDB item.
      </Paragraph>

      <Paragraph>
        The second reason to avoid ODMs is that it doesn’t really save you much
        time or code compared to the basic AWS SDK.
      </Paragraph>

      <Paragraph className="mt-4">
        The first exception is for tools like the Document Client provided by
        AWS in their Node.js SDK. The Document Client is a thin wrapper on top
        of the core AWS SDK. With the core AWS SDK, you need to specify an
        attribute type whenever you’re reading or writing an item. With the
        Document Client, attribute types are inferred for you. I have used
        Document client throughout this application.
      </Paragraph>

      <Footer previous="/chapter_5/5.1" next="/chapter_5/5.3" />
    </main>
  );
}
