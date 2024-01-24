import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_8_1() {
  return (
    <main>
      <PageTitle>8.1: What is single-table design</PageTitle>
      <SectionTitle>1: Background on SQL modeling & joins</SectionTitle>
      <Paragraph>
        With relational databases, you generally normalize your data by creating
        a table for each type of entity in your application. For example, if
        you’re making an e-commerce application, you’ll have one table for
        Customers and one table for Orders.
      </Paragraph>
      <Paragraph>
        Each Order belongs to a certain Customer, and you use foreign keys to
        refer from a record in one table to a record in another. These foreign
        keys act as pointers. To follow these pointers, the SQL language for
        querying relational databases has a concept of joins. Joins allow you to
        combine records from two or more tables at read-time.
      </Paragraph>

      <SectionTitle>2: The problem of missing joins in DynamoDB</SectionTitle>
      <Paragraph>
        While convenient, SQL joins are also expensive. They require scanning
        large portions of multiple tables in your relational database, comparing
        different values, and returning a result set.
      </Paragraph>
      <Paragraph>
        DynamoDB was built for enormous, high-velocity use cases, such as the
        Amazon.com shopping cart. These use cases can’t tolerate the
        inconsistency and slowing performance of joins as a dataset scales.
      </Paragraph>
      <Paragraph>
        DynamoDB closely guards against any operations that won’t scale, and
        there’s not a great way to make relational joins scale. Rather than
        working to make joins scale better, DynamoDB sidesteps the problem by
        removing the ability to use joins at all.
      </Paragraph>
      <Paragraph>
        In our example above, we want to get both a Customer record and all
        Orders for the customer. Many developers apply relational design
        patterns with DynamoDB even though they don’t have the relational tools
        like the join operation. This means they put their items into different
        tables according to their type. However, since there are no joins in
        DynamoDB, they’ll need to make multiple, serial requests to fetch both
        the Orders and the Customer record.
      </Paragraph>
      <Paragraph>
        This can become a big issue in your application. Network I/O is likely
        the slowest part of your application, but now you’re making multiple
        network requests in a waterfall fashion, where one request provides data
        that is used for subsequent requests. As your application scales, this
        pattern gets slower and slower.
      </Paragraph>

      <SectionTitle>
        3: The solution: pre-join your data into item collections
      </SectionTitle>
      <Paragraph>
        So how do you get fast, consistent performance from DynamoDB without
        making multiple requests to your database? By pre-joining your data
        using item collections.
      </Paragraph>
      <Paragraph>
        You can use DynamoDB’s Query API operation to read multiple items with
        the same partition key. Thus, if you need to retrieve multiple
        heterogeneous items in a single request, you organize those items so
        that they are in the same item collection.
      </Paragraph>

      <SectionTitle>4: Other benefits of single-table design</SectionTitle>
      <Paragraph>
        First, there is some operational overhead with each table you have in
        DynamoDB. If you have one table with all items in it rather than eight
        separate tables, you reduce the number of alarms and metrics to watch.
      </Paragraph>
      <Paragraph>
        Second, having a single table can save you money as compared to having
        multiple tables.
      </Paragraph>
      <Paragraph>
        In general, when thinking about single-table design, the main benefit is
        the performance improvement by making a single request to retrive all
        needed items.
      </Paragraph>
      <Footer previous="/chapter_8" next="/chapter_8/8.2" />
    </main>
  );
}
