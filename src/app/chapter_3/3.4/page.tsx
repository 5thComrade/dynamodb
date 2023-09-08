import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_3_4() {
  return (
    <main>
      <PageTitle>3.4: Consistency</PageTitle>
      <Paragraph>
        Consistency refers to whether a particular read operation receives all
        write operations that have occurred prior to the read.
      </Paragraph>
      <Paragraph>
        {`As we just read in the previous section, DynamoDB splits up, or
        "shards", its data by splitting it across multiple partitions. This
        allows DynamoDB to horizontally scale by adding more storage nodes.`}
      </Paragraph>
      <Paragraph>
        When you write data to DynamoDB, there is a request router that will
        authenticate your request to ensure you have access to write to the
        table. If so, it will hash the partition key of your item and send that
        key to the proper primary node for that item.
      </Paragraph>
      <Paragraph className="mt-4 font-semibold">
        The primary node for a partition holds the canonical, correct data for
        the items in that node. When a write request comes in, the primary node
        will commit the write and commit the write to one of two secondary nodes
        for the partition. This ensures the write is saved in the event of a
        loss of a single node. After the primary node responds to the client to
        indicate that the write was successful, it then asynchronously
        replicates the write to a third storage node.
      </Paragraph>
      <Paragraph className="font-semibold">
        Thus, there are three nodes—one primary and two secondary—for each
        partition. These secondary nodes serve a few purposes. First, they
        provide fault-tolerance in case the primary node goes down. Secondly,
        these secondary nodes can serve read requests to alleviate pressure on
        the primary node.
      </Paragraph>

      <Paragraph>
        However, notice that there is a potential issue here. Because writes are
        asynchronously replicated from the primary to secondary nodes, the
        secondary might be a little behind the primary node. And because you can
        read from the secondary nodes, it’s possible you could read a value from
        a secondary node that does not reflect the latest value written to the
        primary.
      </Paragraph>
      <Paragraph className="mt-4">
        With that in mind, let’s look at the two consistency options available
        with DynamoDB:
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Strong consistency: </span>any item
        you read from DynamoDB will reflect all writes that occurred prior to
        the read being executed.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">- Eventual consistency: </span>with
        eventual consistency, it’s possible the item(s) you read will not
        reflect all prior writes.
      </Paragraph>
      <Paragraph className="mt-4">
        Finally, there are two times you need to think about consistency with
        DynamoDB.
      </Paragraph>
      <Paragraph>
        First, whenever you are reading data from your base table, you can
        choose your consistency level. By default, DynamoDB will make an
        eventually-consistent read. However, you can opt into a
        strongly-consistent read by passing{" "}
        <span className="font-semibold">ConsistentRead=True</span> in your API
        call. An eventually-consistent read consumes half the write capacity of
        a strongly-consistent read.
      </Paragraph>
      <Paragraph>
        Second, you should think about consistency when choosing your secondary
        index type. A local secondary index will allow you to make
        strongly-consistent reads against it, just like the underlying table.
        However, a global secondary index will only allow you to make
        eventually-consistent reads.
      </Paragraph>

      <Footer previous="/chapter_3/3.3" next="/chapter_3/3.5" />
    </main>
  );
}
