import { PageTitle, Paragraph } from "@/components/custom/Typography";
import AddCustomerForm from "./_components/AddCustomerForm";
import Footer from "@/components/custom/Footer";

export default function Chapter_6() {
  return (
    <main>
      <PageTitle>Chapter 6: Expressions</PageTitle>
      <Paragraph>
        Expressions are statements that operate on your items. They’re sort of
        like mini- SQL statements.
      </Paragraph>
      <Paragraph>There are five types of expressions in DynamoDB:</Paragraph>
      <Paragraph>
        1: <span className="font-semibold">Key Condition Expressions:</span>{" "}
        Used in the Query API call to describe which items you want to retrieve
        in your query
      </Paragraph>
      <Paragraph>
        2: <span className="font-semibold">Filter Expressions:</span> Used in
        Query and Scan operations to describe which items should be returned to
        the client after finding items that match your key condition expression
      </Paragraph>
      <Paragraph>
        3: <span className="font-semibold">Projection Expressions:</span> Used
        in all read operations to describe which attributes you want to return
        on items that were read
      </Paragraph>
      <Paragraph>
        4: <span className="font-semibold">Condition Expressions:</span> Used in
        write operations to assert the existing condition (or non-condition) of
        an item before writing to it
      </Paragraph>
      <Paragraph>
        5: <span className="font-semibold">Update Expressions:</span> Used in
        the UpdateItem call to describe the desired updates to an existing item
      </Paragraph>
      <Paragraph className="mt-4">
        The first three expressions are for read-based operations. The fourth,
        Condition Expressions, is for all write-based operations, and the last,
        Update Expressions, is for update operations only.
      </Paragraph>
      <Paragraph className="mt-4 font-semibold">
        In order to learn all the expressions in this chapter, we will assume
        that we are a business owner who needs to keep a track of all the
        customers. As the business owner we will be able to create, read, update
        and delete our customer data. So lets add a few customers before we
        proceed with the sub-sections in this chapter.
      </Paragraph>
      <Paragraph className="mt-4 font-semibold">
        {`We will store each customer details in our dynamodb table. We will set the partition key(pk) as "CUSTOMERS" and we will set the sort key(sk) as "CUSTOMER#<PhoneNumber>", since phone numbers are unique to each customer, it seems like the right fit for the sort key.`}
      </Paragraph>
      <AddCustomerForm />
      <Footer previous="/chapter_5/5.3" next="/chapter_6/6.1" />
    </main>
  );
}
