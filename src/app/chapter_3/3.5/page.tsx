import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_3_5() {
  return (
    <main>
      <PageTitle>3.5: DynamoDB Limits</PageTitle>
      <SectionTitle>- Item size limits</SectionTitle>
      <Paragraph>
        A single DynamoDB item is limited to 400KB of data. Like everything in
        DynamoDB, these size limits are intentional. They push you away from
        anti-patterns and toward proper data modeling. Large item sizes mean
        larger reads from disk, resulting in slower response times and fewer
        concurrent requests. You should break down larger items into smaller
        items and do more targeted operations.
      </Paragraph>

      <SectionTitle>- Query and Scan Request Size Limits</SectionTitle>
      <Paragraph>
        Query and Scan will read a maximum of 1MB of data from your table.
        Further, this 1MB limit is applied before any filter expressions are
        considered. This 1MB limit is crucial to keeping DynamoDB’s promise of
        consistent single-digit response times. If you have a request that will
        address more than 1MB of data, you will need to paginate through the
        results by making follow-up requests to DynamoDB.
      </Paragraph>

      <SectionTitle>- Partition throughput limits</SectionTitle>
      <Paragraph>
        A single partition can have a maximum of 3000 Read Capacity Units or
        1000 Write Capacity Units. You will need to be doing 3000 reads per
        second for a given partition key to hit these limits.
      </Paragraph>

      <SectionTitle>- Item collection limits</SectionTitle>
      <Paragraph>
        An item collection refers to all items with a given partition key, both
        in your main table and any local secondary indexes. If you have a local
        secondary index, a single item collection cannot be larger than 10GB. If
        you do not have a local secondary index, this limit will not affect you.
        The partition size limit is not a problem for global secondary indexes.
      </Paragraph>
      <Footer previous="/chapter_3/3.4" next="/chapter_3/3.6" />
    </main>
  );
}
