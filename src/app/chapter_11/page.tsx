import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_11() {
  return (
    <main>
      <PageTitle>
        Chapter 11: Strategies for one-to-many relationships
      </PageTitle>
      <Paragraph>
        A one-to-many relationship is when a particular object is the owner or
        source for a number of sub-objects. For example, Workplace: A single
        office will have many employees working there; a single manager may have
        many direct reports. With one-to-many relationships, there’s one core
        problem: how do I fetch information about the parent entity when
        retrieving one or more of the related entities?
      </Paragraph>
      <Paragraph>
        In this chapter, we will cover five strategies for modeling one-to- many
        relationships with DynamoDB:
      </Paragraph>
      <Paragraph>1: Denormalization by using a complex attribute</Paragraph>
      <Paragraph>2: Denormalization by duplicating data</Paragraph>
      <Paragraph>3: Composite primary key + the Query API action</Paragraph>
      <Paragraph>4: Secondary index + the Query API action</Paragraph>
      <Paragraph>5: Composite sort keys with hierarchical data</Paragraph>

      <Footer previous="/chapter_10" next="/chapter_11/11.1" />
    </main>
  );
}
