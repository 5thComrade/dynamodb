import Footer from "@/components/custom/Footer";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import FilterCustomersByZipcode from "../_components/FilterCustomersByZipcode";

export default function chapter_6_2() {
  return (
    <main>
      <PageTitle>6.2: Filter Expressions</PageTitle>

      <Paragraph>
        A filter expression is available for both Query and Scan operations,
        where you will be receiving multiple items back in a request. The key
        difference with a filter expression vs. a key condition expression is
        that a filter expression can be applied on any attribute in the table,
        not just those in the primary key.
      </Paragraph>
      <Paragraph>
        {`Remember our customers data-set. The partition key is always "CUSTOMERS" and the sort key is "CUSTOMER#{phone_number}". If we want to filter on something like zipcode, we can't do it with key condition expression.`}
      </Paragraph>

      <FilterCustomersByZipcode />

      <SectionTitle>Challenges of Filter Expressions</SectionTitle>

      <Paragraph>
        When you issue a Query or Scan request to DynamoDB, DynamoDB performs
        the following actions in order:
      </Paragraph>
      <Paragraph>
        1: It reads items matching your Query or Scan from the database using
        the Key Condition expression.
      </Paragraph>
      <Paragraph>
        2: If a filter expression is present, it filters out items from the
        results that don’t match the filter expression.
      </Paragraph>
      <Paragraph>3: It returns any remaining items to the client.</Paragraph>

      <Paragraph className="mt-3">
        The key point to understand is that the Query and Scan operations will
        return a maximum of 1MB of data, and this limit is applied in step 1,
        before the filter expression is applied.
      </Paragraph>

      <SectionTitle>
        Filter expressions are useful for a few limited contexts:
      </SectionTitle>

      <Paragraph>1: Reducing response payload size.</Paragraph>
      <Paragraph>2: Easier application filtering.</Paragraph>
      <Paragraph>
        3: Better validation around time-to-live (TTL) expiry. When using
        DynamoDB TTL, AWS states that items are generally deleted within 48
        hours of their TTL expiry. This is a wide range! If you’re counting on
        expiration as a part of your business logic, you could get incorrect
        results. To help guard against this, you could write a filter expression
        that removes all items that should have been expired by now, even if
        they’re not quite expired yet.
      </Paragraph>
      <Footer previous="/chapter_6/6.1" next="/chapter_6/6.3" />
    </main>
  );
}
