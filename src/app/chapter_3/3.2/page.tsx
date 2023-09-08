import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_3_2() {
  return (
    <main>
      <PageTitle>3.2: Time-to-live (TTL)</PageTitle>
      <Paragraph>
        TTLs allow you to have DynamoDB automatically delete items on a per-item
        basis. This is a great option for storing short-term data in DynamoDB as
        you can use TTL to clean up your database rather than handling it
        manually via a scheduled job.
      </Paragraph>
      <Paragraph>
        To use TTL, you specify an attribute on your DynamoDB table that will
        serve as the marker for item deletion. For each item that you want to
        expire, you should store a Unix timestamp as a number in your specified
        attribute. This timestamp should state the time after which the item
        should be deleted. DynamoDB will periodically review your table and
        delete items that have your TTL attribute set to a time before the
        current time.
      </Paragraph>
      <Paragraph>
        One nice feature about TTLs is that you don’t need to use it for all
        items in your table. For items that you don’t want to automatically
        expire, you can simply not set the TTL attribute on the item.
      </Paragraph>
      <Paragraph>
        Items are generally deleted in a timely manner, but AWS only states that
        items will usually be deleted within 48 hours after the time indicated
        by the attribute. This delay could be unacceptable for the access
        patterns in your application. Rather than relying on the TTL for data
        accuracy in your application, you should confirm an item is not expired
        when you retrieve it from DynamoDB.
      </Paragraph>

      <Footer previous="/chapter_3/3.1" next="/chapter_3/3.3" />
    </main>
  );
}
