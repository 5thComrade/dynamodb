import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_4_1() {
  return (
    <main>
      <PageTitle>4.1: Item-based actions</PageTitle>
      <Paragraph>
        Item-based actions are used whenever you are operating on a specific
        item in your DynamoDB table. There are four core API actions for
        item-based actions:
      </Paragraph>

      <ol className="ml-8 list-outside list-decimal text-lg">
        <li>
          <span className="font-semibold">GetItem -- </span> used for reading a
          single item from a table.
        </li>
        <li>
          <span className="font-semibold">PutItem -- </span> used for writing an
          item to a table. This can completely overwrite an existing item with
          the same key, if any.
        </li>
        <li>
          <span className="font-semibold">UpdateItem -- </span> used for
          updating an item in a table. This can create a new item if it doesn’t
          previously exist, or it can add, remove, or alter properties on an
          existing item.
        </li>
        <li>
          <span className="font-semibold">DeleteItem -- </span> used for
          deleting an item from a table.
        </li>
      </ol>

      <Paragraph className="mt-4">
        There are three rules around item-based actions. First, the full primary
        key must be specified in your request. Second all actions to alter
        data—writes, updates, or deletes—must use an item-based action. Finally,
        all item-based actions must be performed on your main table, not a
        secondary index.
      </Paragraph>

      <Paragraph className="mt-4">
        {`You can’t make a write operation to DynamoDB that says, "Update the
        attribute X for all items with a partition key of Y" (assuming a
        composite primary key).`}
      </Paragraph>

      <Paragraph className="mt-4">
        In addition to the core single-item actions above, there are two sub-
        categories of single-item API actions—batch actions and transaction
        actions. These categories are used for reading and writing multiple
        DynamoDB items in a single request. While these operate on multiple
        items at once, I still classify them as item-based actions because you
        must specify the exact items on which you want to operate. The separate
        requests are split up and processed once they hit the DynamoDB router,
        and the batch requests simply save you from making multiple trips.
      </Paragraph>

      <Paragraph className="mt-4">
        There is a subtle difference between the batch API actions and the
        transactional API actions. In a batch API request, your reads or writes
        can succeed or fail independently. The failure of one write won’t affect
        the other writes in the batch.
      </Paragraph>

      <Paragraph className="mt-4">
        With the transactional API actions, on the other hand, all of your reads
        or writes will succeed or fail together. The failure of a single write
        in your transaction will cause the other writes to be rolled back.
      </Paragraph>

      <Footer previous="/chapter_4" next="/chapter_4/4.2" />
    </main>
  );
}
