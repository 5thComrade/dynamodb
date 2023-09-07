import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_2_1() {
  return (
    <main>
      <PageTitle>2.1: Basic Vocabulary</PageTitle>
      <SectionTitle>1: Table</SectionTitle>
      <Paragraph>
        A DynamoDB table is similar in some ways to a table in a relational
        database or a collection in MongoDB. It is a grouping of records that
        conceptually belong together.
      </Paragraph>
      <Paragraph>
        A DynamoDB table differs from a relational database table in a few ways.
        First, a relational database table includes only a single type of
        entity. If you have multiple entity types in your application, such as
        Customers, Orders, and Inventory Items, each of them would be split into
        a separate table in a relational database. You can retrieve items from
        different tables in a single request by using a join operation to
        combine them.
      </Paragraph>
      <Paragraph>
        In contrast, you often include multiple entity types in the same
        DynamoDB table. This is to avoid the join operation, which is expensive
        as a database scales.
      </Paragraph>
      <Paragraph>
        Second, a relational database table has a specified schema that
        describes and enforces the shape of each record in the table. At the
        database level, DynamoDB is schemaless, meaning the table itself won’t
        ensure your records conform to a given schema. Your record schema is
        enforced elsewhere, in your application code, rather than in your
        database.
      </Paragraph>
      <SectionTitle>2: Item</SectionTitle>
      <Paragraph>
        An item is a single record in a DynamoDB table. It is comparable to a
        row in a relational database or a document in MongoDB.
      </Paragraph>
      <SectionTitle>3: Attributes</SectionTitle>
      <Paragraph>
        {`If you had an item representing a User, you might have an attribute
        named "Username" with a value of "antony.chiramel".`}
      </Paragraph>
      <Paragraph>
        Attributes are similar to column values on relational records, with the
        caveat that attributes are not required on every item like they are in a
        relational database.
      </Paragraph>
      <Paragraph>
        There are ten different data types in DynamoDB. It’s helpful to split
        them into three categories:
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Scalars: </span>Scalars represent a
        single, simple value, such as a username (string) or an age (integer).
        There are five scalar types: string, number, binary, boolean, and null.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Complex: </span>There are two complex
        types: lists and maps. You can use complex attribute types to hold
        related elements.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Sets: </span>They are similar to sets
        in your favorite programming language. Each element in a set must be the
        same type, and there are three set types: string sets, number sets, and
        binary sets. Sets are useful for tracking uniqueness in a particular
        domain.
      </Paragraph>
      <Paragraph>
        The type of attribute affects which operations you can perform on that
        attribute in subsequent operations. For example, if you have a number
        attribute, you can use an update operation to add or subtract from the
        attribute.
      </Paragraph>
      <SectionTitle>4: Primary keys</SectionTitle>
      <Paragraph>
        When creating a DynamoDB table, you must declare a primary key for your
        table. The primary key can be simple, consisting of a single value, or
        composite, consisting of two values.
      </Paragraph>
      <Paragraph>
        Each item in your table is uniquely identifiable by its primary key.
        Almost all of your data access will be driven off primary keys, so you
        need to choose them wisely.
      </Paragraph>
      <SectionTitle>5: Secondary indexes</SectionTitle>
      <Paragraph>
        When you create a secondary index on your table, you specify the primary
        keys for your secondary index, just like when you’re creating a table.
        AWS will copy all items from your main table into the secondary index in
        the reshaped form. You can then make queries against the secondary
        index.
      </Paragraph>
      <Footer previous="/chapter_2" next="/chapter_2/2.2" />
    </main>
  );
}
