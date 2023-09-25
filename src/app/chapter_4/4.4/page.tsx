import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_4_4() {
  return (
    <main>
      <PageTitle>4.4: How DynamoDB enforces efficiency</PageTitle>
      <Paragraph>
        {`The key point to understand about DynamoDB is that it won’t let you
        write a bad query. And by 'bad query', I mean a query that will degrade
        in performance as it scales.`}
      </Paragraph>
      <Paragraph>
        DynamoDB uses partitions, or small storage nodes of about 10GB, to shard
        your data across multiple machines. The sharding is done on the basis of
        the partition key. Thus, if the DynamoDB request router is given the
        partition key for an item, it can do an O(1) lookup in a hash table to
        find the exact node or set of nodes where that item resides.
      </Paragraph>

      <Paragraph className="mt-4">
        This is why all the single-item actions and the Query action require a
        partition key. No matter how large your table becomes, including the
        partition key makes it a constant time operation to find the item or
        item collection that you want.
      </Paragraph>

      <Paragraph className="mt-4">
        All the single-item actions also require the sort key (if using a
        composite primary key) so that the single-item actions are constant time
        for the entire operation. But the Query action is different. The Query
        action fetches multiple items. So how does the Query action stay
        efficient?
      </Paragraph>

      <Paragraph className="mt-4">
        {`Note that the Query action only allows you to fetch a contiguous block of items within a particular item collection. You can do operations like >=, <=, begins_with(), or between, but you can’t do contains() or ends_with(). This is because an item collection is ordered and stored as a B-tree. Remember that a B-tree is like a phone book or a dictionary. If you go to a dictionary, it’s trivial to find all words between "hippopotamus" and "igloo". It’s much harder to find all words that end in "-ing".`}
      </Paragraph>

      <Paragraph className="mt-4">
        The time complexity of a B-tree search is O(log n). This isn’t as fast
        as our constant-time O(1) lookup for finding the item collection, but
        it’s still pretty quick to grab a batch of items from a collection.
        Further, the size of n is limited. We’re not doing an O(log n) search
        over our entire 10TB dataset. We’re doing it on a single item
        collection, which is likely a few GB at most.
      </Paragraph>

      <Paragraph className="mt-4">
        Finally, just to really put a cap on how slow an operation can be,
        DynamoDB limits all Query and Scan operations to 1MB of data in total.
        Thus, even if you have an item collection with thousands of items and
        you’re trying to fetch the entire thing, you’ll still be bounded in how
        slow an individual request can be. If you want to fetch all those items,
        you’ll need to make multiple, serial requests to DynamoDB to page
        through the data. Because this is explicit— you’ll need to write code
        that uses the LastEvaluatedKey parameter—it is much more apparent to you
        when you’re writing an access pattern that won’t scale.
      </Paragraph>

      <Footer previous="/chapter_4/4.3" next="/chapter_5" />
    </main>
  );
}
