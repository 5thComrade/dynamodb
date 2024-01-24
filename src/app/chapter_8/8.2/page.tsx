import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_8_2() {
  return (
    <main>
      <PageTitle>8.2: Downsides of a single-table design</PageTitle>
      <Paragraph>
        There are three downsides of single-table design in DynamoDB:
      </Paragraph>
      <Paragraph>
        - The steep learning curve to understand single-table design
      </Paragraph>
      <Paragraph>- The inflexibility of adding new access patterns</Paragraph>
      <Paragraph>
        - The difficulty of exporting your tables for analytics
      </Paragraph>

      <SectionTitle>
        1: The steep learning curve of single-table design
      </SectionTitle>
      <Paragraph>
        A single, over-loaded DynamoDB table looks really weird compared to the
        clean, normalized tables of your relational database.
      </Paragraph>
      <Paragraph>
        Software development is a continuous journey of learning, and you can’t
        use the difficulty of learning new things as an excuse to use a new
        thing poorly. If you want the advantages of DynamoDB— infinite
        scalability, convenient connection model, and consistent performance—you
        need to take the time to learn how to use it.
      </Paragraph>

      <SectionTitle>2: The inflexibility of new access patterns</SectionTitle>
      <Paragraph>
        A second complaint about DynamoDB is the difficulty of accommodating new
        access patterns in a single-table design. This complaint has more
        validity.
      </Paragraph>
      <Paragraph>
        When modeling a single-table design in DynamoDB, you start with your
        access patterns first. When doing this, you will organize your items
        into collections such that each access pattern can be handled with as
        few requests as possible—ideally a single request.
      </Paragraph>
      <Paragraph>
        However, your table design is narrowly tailored for the exact purpose
        for which it has been designed. If your access patterns change because
        you’re adding new objects or accessing multiple objects in different
        ways, you may need to do an ETL process to scan every item in your table
        and update with new attributes. This process isn’t impossible, but it
        does add friction to your development process.
      </Paragraph>

      <SectionTitle>3: The difficulty of analytics</SectionTitle>
      <Paragraph>
        DynamoDB is designed for on-line transactional processing (OLTP) use
        cases—high speed, high velocity data access where you’re operating on a
        few records at a time. But users also have a need for on-line analytics
        processing (OLAP) access patterns—big, analytical queries over the
        entire dataset to find popular items, number of orders by day, or other
        insights.
      </Paragraph>
      <Paragraph>
        DynamoDB is not good at OLAP queries. This is intentional. DynamoDB
        focuses on being ultra-performant at OLTP queries and wants you to use
        other, purpose-built databases for OLAP. To do this, you’ll need to get
        your data from DynamoDB into another system.
      </Paragraph>

      <Footer previous="/chapter_8/8.1" next="/chapter_8/8.3" />
    </main>
  );
}
