import Footer from "@/components/custom/Footer";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";

export default function chapter_7_2() {
  return (
    <main>
      <PageTitle>7.2. Steps for Modeling with DynamoDB</PageTitle>

      <Paragraph>
        Data modeling in DynamoDB is driven entirely by your access patterns.
        You will not be able to model your data in a generic way that allows for
        flexible access in the future. You must shape your data to fit the
        access patterns.
      </Paragraph>

      <SectionTitle>
        1: Create an entity-relationship diagram (ERD)
      </SectionTitle>
      <Paragraph>
        The first step in your data modeling process is to create an
        entity-relationship diagram, or ERD. An entity-relationship diagram is
        just like it sounds—a diagram that lists the different entities in your
        application and how they relate to each other.
      </Paragraph>
      <Paragraph>
        {`Imagine you have a "Notes" application. Users sign up for your
        application, and they can save notes. A note has a title, a date when it
        was created, and a body, which contains the content of the note.`}
      </Paragraph>
      <Paragraph>
        Users and Notes are the entities in your application. Usually, these are
        the nouns you use when talking about your application—Users, Notes,
        Orders, Organizations, etc. Our User entity has a username, email
        address, and date created, while the Note entity has a title, a date
        created, and a body.
      </Paragraph>
      <Paragraph>
        The next thing to notice in an ERD diagram is the relationship between
        the entities. This indicates a relationship between the two entities. In
        our case, it is a one-to-many relationship. A user can have multiple
        notes.
      </Paragraph>

      <SectionTitle>2: Define your access patterns</SectionTitle>
      <Paragraph>
        Your next step after creating an ERD is to define your data access
        patterns. All of them. Be specific and thorough. Failure to do this
        correctly may lead to problems down the line as you find your DynamoDB
        table isn’t as flexible to new patterns as your relational database was.
      </Paragraph>

      <Footer previous="/chapter_7/7.1" next="/chapter_8" />
    </main>
  );
}
