import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_2_2() {
  return (
    <main>
      <PageTitle>
        2.2: A Deeper Look: Primary keys and secondary indexes
      </PageTitle>
      <SectionTitle>1: Types of primary keys</SectionTitle>
      <Paragraph>
        <span className="font-semibold">- Simple primary keys, </span>which
        consist of a single element called a partition key.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Composite primary keys, </span>which
        consist of two elements, called a partition key and a sort key.
      </Paragraph>
      <Paragraph className="mt-4">
        {`You may occasionally see a partition key called a "hash key" and a sort
        key called a "range key". I’ll stick with the "partition key" and "sort
        key" terminology in this tutorial.`}
      </Paragraph>
      <Paragraph>
        A simple primary key allows you to fetch only a single item at a time.
        It works well for one-to-one operations where you are only operating on
        individual items.
      </Paragraph>
      <Paragraph>
        {`Composite primary keys, on the other hand, enable a "fetch many" access
        pattern. With a composite primary key, you can use the Query API to grab
        all items with the same partition key. You can even specify conditions
        on the sort key to narrow down your query space.`}
      </Paragraph>

      <SectionTitle>2: Kinds of secondary indexes</SectionTitle>
      <Paragraph>
        There are two kinds of secondary indexes in DynamoDB:
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Local secondary indexes: </span>A
        local secondary index uses the same partition key as your table’s
        primary key but a different sort key.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Global secondary indexes: </span>With
        a global secondary index, you can choose any attributes you want for
        your partition key and your sort key.
      </Paragraph>
      <Paragraph className="mt-4">
        For global secondary indexes, you need to provision additional
        throughput for the secondary index. The read and write throughput for
        the index is separate from the core table’s throughput. This is not the
        case for local secondary indexes, which use the throughput from the core
        table.
      </Paragraph>
      <Paragraph>
        Another difference between global and local secondary indexes are in
        their consistency models. A{" "}
        <span className="font-semibold">Strong consistency</span> means you will
        get the latest data from the db if you do a read operation immediately
        after a write operation on the same item. Whereas, an{" "}
        <span className="font-semibold">Eventual consistency</span> model means
        you may get a slightly older data if you do a read operation immediately
        after a write operation on the same item.
      </Paragraph>
      <Paragraph>
        With global secondary indexes, your only choice is eventual consistency.
        Data is replicated from the core table to global secondary indexes in an
        asynchronous manner.
      </Paragraph>
      <Paragraph>
        On the other hand, local secondary indexes allow you to opt for
        strongly-consistent reads if you want it.
      </Paragraph>
      <Paragraph>
        In general, I opt for global secondary indexes. They’re more flexible,
        you don’t need to add them at table-creation time, and you can delete
        them if you need to.
      </Paragraph>
      <Footer previous="/chapter_2/2.1" next="/chapter_2/2.3" />
    </main>
  );
}
