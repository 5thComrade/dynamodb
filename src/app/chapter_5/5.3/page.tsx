import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_5_3() {
  return (
    <main>
      <PageTitle>
        5.3: Understand the optional properties on individual requests
      </PageTitle>
      <Paragraph>
        The final advice for working with the DynamoDB API is to understand the
        optional properties you can add on to individual requests. The
        properties are:
      </Paragraph>

      <ul className="ml-8 list-disc">
        <li className="text-lg">ConsistentRead</li>
        <li className="text-lg">ScanIndexForward</li>
        <li className="text-lg">ReturnValues</li>
        <li className="text-lg">ReturnConsumedCapacity</li>
        <li className="text-lg">ReturnItemCollectionMetrics</li>
      </ul>

      <Paragraph>
        The first three properties could affect the items you receive back in
        your DynamoDB request. The last two can return additional metric
        information about your table usage.
      </Paragraph>

      <SectionTitle>1: ConsistentRead</SectionTitle>
      <Paragraph>
        By default, reads from DynamoDB are eventually consistent, meaning that
        the reads will likely, but not definitely, reflect all write operations
        that have happened before the given read operation.
      </Paragraph>
      <Paragraph>
        For some use cases, eventual consistency may not be good enough.
      </Paragraph>
      <Paragraph>
        {`To get a strongly-consistent read, you need to set 'ConsistentRead=True'
        in your API call. The ConsistentRead property is available on four
        operations:`}
        <br />
        1: GetItem
        <br />
        2: BatchGetItem
        <br />
        3: Query
        <br />
        4: Scan
        <br />
      </Paragraph>
      <Paragraph>
        There are two more aspects to consistent reads that are worth knowing.
        First, opting into a strongly-consistent read consumes more read request
        units than using an eventually-consistent read. Each read request unit
        allows you to read an item up to 4KB in size. If you use the default of
        an eventually-consistent read, your read request units will be cut in
        half. Thus, reading a single item of up to 4KB in size would only cost
        you half of a read request unit. Opting into a strongly-consistent read
        will consume the full read request unit.
      </Paragraph>
      <Paragraph>
        The second thing to note about consistency is related to secondary
        indexes. Note that the ConsistentRead property is available on the Query
        and Scan operations, which are the two API actions you can use with
        secondary indexes. If you are using a local secondary index, you may opt
        into strong consistency by passing ConsistentRead=True. However, you may
        not request strong consistency when using a global secondary index. All
        reads from a global secondary index are eventually consistent.
      </Paragraph>

      <SectionTitle>2: ScanIndexForward</SectionTitle>

      <Paragraph>
        This property is available only on the Query operation, and it controls
        which way you are reading results from the sort key.
      </Paragraph>
      <Paragraph>
        Imagine you have an IoT application where you are storing sensor data.
        Each item in the table reflects a reading at a particular point in time
        for a given sensor. You have a composite primary key where the partition
        key is SensorId, and the sort key is Timestamp.
      </Paragraph>
      <Paragraph>
        A common access pattern for your application may be to find the most
        recent 20 readings for a particular sensor. To do this, you would use a
        Query where the partition key is the ID for the sensor you want.
      </Paragraph>
      <Paragraph>
        However, DynamoDB orders its sort key in ascending order. Imagine your
        sensor reported data every minute. After a single day of operation, your
        sensor would have 1440 readings. However, to find the most recent 20
        readings, you would need to page through all 1440 readings until you got
        to the end. That would consume a lot of read capacity!
      </Paragraph>
      <Paragraph>
        The ScanIndexForward property allows you to flip the direction in which
        DynamoDB will read your sort key. If you set ScanIndexForward=False,
        then DynamoDB will read your sort key in descending order.
      </Paragraph>

      <SectionTitle>3: ReturnValues</SectionTitle>

      <Paragraph>
        When working with items in DynamoDB, you may execute an operation
        against an item without knowing the full current state of the item. For
        example, when updating an item, you could increment a number attribute
        on the item without knowing the current value of the attribute.
      </Paragraph>
      <Paragraph>
        It can be helpful to receive additional information about the existing
        or updated item from DynamoDB after the call finishes. For example, if
        you were incrementing a counter during an update, you may want to know
        the value of the counter after the update is complete. Or if you deleted
        an item, you may want to view the item as it looked before deletion.
      </Paragraph>
      <Paragraph>
        To help with this, certain API actions have a ReturnValues attribute
        that affects the payload that is returned to your client. This property
        is available on the following write-based API actions:
        <br />
        1: PutItem
        <br />
        2: UpdateItem
        <br />
        3: DeleteItem
        <br />
        4: TransactWriteItem (here, the property is referred to as
        ReturnValuesOnConditionCheckFailure)
      </Paragraph>
      <Paragraph className="mt-3">
        By default, DynamoDB will not return any additional information about
        the item. There are a few different available options for the
        ReturnValues property:
        <br />
        1: NONE: Return no attributes from the item. This is the default
        setting.
        <br />
        2: ALL_OLD: Return all the attributes from the item as it looked before
        the operation was applied.
        <br />
        3: UPDATED_OLD: For any attributes updated in the operation, return the
        attributes before the operation was applied.
        <br />
        4: ALL_NEW: Return all the attributes from the item as it looks after
        the operation is applied.
        <br />
        5: UPDATED_NEW: For any attributes updated in the operation, return the
        attributes after the operation is applied.
      </Paragraph>

      <SectionTitle>4: ReturnConsumedCapacity</SectionTitle>
      <Paragraph>
        The ReturnConsumedCapacity property is an optional property that will
        return data about the capacity units that were used by the request.
        Recall that DynamoDB is priced based on read and write capacity units,
        and the amount of capacity used depends on a few factors:
        <br />
        1: the size of the item(s) you’re reading or writing;
        <br />
        2: for read operations, whether you’re doing an eventually- or
        strongly-consistent read;
        <br />
        3: whether you’re making a transactional request.
      </Paragraph>
      <Paragraph className="mt-3">
        You can specify ReturnConsumedCapacity=TOTAL to simply receive an
        overall summary of the capacity consumed in the operation. You can also
        specify ReturnConsumedCapacity=INDEXES, which will include detailed
        information.
      </Paragraph>
      <Paragraph>
        You may use these metrics if you are in the early stages of designing
        your table. To confirm it will work as intended, you can build out a
        prototype and throw some sample traffic to see how it will perform.
      </Paragraph>
      <Paragraph>
        The second example where consumed capacity is useful is if you’re
        passing on the underlying cost of DynamoDB table access to your
        customers.
      </Paragraph>

      <SectionTitle>5: ReturnItemCollectionMetrics</SectionTitle>
      <Paragraph>
        An item collection refers to all items in a table or index that have the
        same partition key.
      </Paragraph>
      <Paragraph>
        <span className="font-semibold">
          If your table has a local secondary index, then a single item
          collection cannot be larger than 10GB in size.
        </span>{" "}
        If you try to write an item that would exceed this limit, the write will
        be rejected.
      </Paragraph>

      <Paragraph>
        This could be a painful surprise to discover that writes to your
        database are failing due to an item collection size limit. To give
        yourself advanced warning of this problem, you can use the
        ReturnItemCollectionMetrics property on all write-based API calls. After
        you receive a response, you can check the size of the altered item
        collection.
      </Paragraph>

      <Footer previous="/chapter_5/5.2" next="/chapter_6" />
    </main>
  );
}
