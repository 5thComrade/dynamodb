import Footer from "@/components/custom/Footer";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import { Separator } from "@/components/ui/separator";

export default function chapter_7_1() {
  return (
    <main>
      <PageTitle>7.1: Differences with relational databases</PageTitle>
      <Paragraph>
        Let’s look at a few ways that data modeling in DynamoDB is different
        than data modeling with a relational database.
      </Paragraph>
      <Paragraph>
        It’s a bad idea to model your data in DynamoDB the same way you model
        your data in a relational database. The entire point of using a NoSQL
        datastore is to get some benefit you couldn’t get with a relational
        database.
      </Paragraph>
      <Paragraph>
        Below are a few key areas where DynamoDB differs from relational
        databases.
      </Paragraph>

      <SectionTitle>1: Joins</SectionTitle>
      <Paragraph>
        In a relational database, you use the JOIN operator to connect data from
        different tables in your query. It’s a powerful way to reassemble your
        data and provide flexibility in your access patterns.
      </Paragraph>
      <Paragraph>
        But joins come at a cost. Joins need large amounts of CPU to combine
        your disparate units of data. Further, joins work best when all relevant
        data is co-located on a single machine so that you don’t need to wait on
        a network call to fetch data from different instances. However, this
        co-location requirement will limit your ability to scale.
      </Paragraph>
      <Paragraph>
        Joins are inefficient at scale, and DynamoDB is built for scale. Rather
        than reassembling your data at read time with a join, you should
        preassemble your data in the exact shape that is needed for a read
        operation.
      </Paragraph>

      <Separator />

      <SectionTitle>2: Normalization</SectionTitle>
      <Paragraph>
        {`'Normalization' is basically the database version of the popular code
        mantra of "Don’t Repeat Yourself" (or, "DRY").`}
      </Paragraph>
      <Paragraph>
        If you have data that is duplicated across records in a table, you
        should split the record out into a separate table and refer to that
        record from your original table.
      </Paragraph>

      <Paragraph className="mt-2 font-semibold">
        Benefits of Normalization
      </Paragraph>
      <Paragraph>
        1: In the 1970s and 1980s, storage was an expensive resource. As such,
        it made sense to reduce duplication of data by only writing it once and
        then having other records point to it. You could use joins to reassemble
        the disaggregated record.
      </Paragraph>
      <Paragraph>
        2: The second reason for normalization is that it helps to maintain data
        integrity over time. If you have a piece of data duplicated across
        multiple records in a table, you’ll need to make sure you update every
        record in that table in the event of a change. In contrast, with a
        normalized database, you can update the record in one place and all
        records that refer to it will get the benefits of the update.
      </Paragraph>

      <Paragraph className="mt-2 font-semibold">
        Why denormalize with DynamoDB
      </Paragraph>
      <Paragraph>
        Normalization requires joins, as you need to reassemble your normalized
        records.
      </Paragraph>
      <Paragraph>
        The first reason for normalization, that of conserving on storage, is no
        longer applicable. Storage is cheap and plentiful. As we start to reach
        the limits of Moore’s Law, compute has become the limiting factor in
        most cases. Given this, it makes sense to optimize for compute by
        denormalizing your data and storing it together in the format needed by
        a read operation rather than optimizing for storage by normalizing and
        re-aggregating your data at query time.
      </Paragraph>
      <Paragraph>
        The second reason for normalization—maintaining data integrity— is still
        a factor, and it’s one you will need to consider as you model your data.
        Data integrity is now an application concern rather than a database
        concern.
      </Paragraph>

      <Separator />

      <SectionTitle>3: Multiple entity types per table</SectionTitle>

      <Paragraph>
        In DynamoDB, you will have multiple different types of entities in a
        single table. In a relational database, each entity type is put into a
        different table. Example: Customers will be in one table.
      </Paragraph>

      <Paragraph>
        There are no joins in DynamoDB, and we also saw that you shouldn’t fake
        joins in your application code by making multiple serial requests to
        your DynamoDB table. Rather than having a Customers table and a
        CustomerOrders table, your application will have a single table that
        includes both Customers and CustomerOrders.
      </Paragraph>

      <Paragraph>
        There are a few implications of this approach that will feel odd coming
        from a relational background.
      </Paragraph>

      <Paragraph>
        First, the primary keys will contain different information depending on
        the type of entity. As such, you probably won’t be able to give
        descriptive names to your primary key attributes. In our example, you
        wouldn’t name the partition key CustomerId as it may be the CustomerId
        for the Customer entity but it may show the OrderId for the
        CustomerOrder entity. As such, you’ll likely use more generic names for
        your primary key attributes, such as PK for the partition key and SK for
        the sort key.
      </Paragraph>
      <Paragraph>
        Second, the attributes on your records will vary. You can’t count on
        each item in a table having the same attributes, as you can in a
        relational database. The attributes on a Customer are significantly
        different than the attributes on a CustomerOrder. This isn’t much of an
        issue for your application code, as the low-level details should be
        abstracted away in your data access logic. However, it can add some
        complexity when browsing your data in the console or when exporting your
        table to an external system for analytical processing.
      </Paragraph>

      <Separator />

      <SectionTitle>4: Filtering</SectionTitle>

      <Paragraph>
        Filtering with relational databases is glorious. You can specify any
        condition you want using the magical WHERE clause. Filtering with
        DynamoDB is much more limited and, as a result, much more performant.
        With DynamoDB, filtering is built directly into your data model. The
        primary keys of your table and your secondary indexes determine how you
        retrieve data. Rather than arbitrarily filtering on any attribute in
        your record, you use precise, surgical requests to fetch the exact data
        you need.
      </Paragraph>

      <Footer previous="/chapter_7" next="/chapter_7/7.2" />
    </main>
  );
}
