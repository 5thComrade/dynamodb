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
      <Paragraph>
        There are two different strategies you can use for building these access
        patterns. One is the API-centric approach, which is common if you’re
        planning to implement a REST API. With the API-centric approach, you
        list out each of the API endpoints you want to support in your
        application, as well as the expected shape you would like to return in
        your response. The second is UI-centric approach. With the UI-centric
        approach, you look at each of the screens in your application and the
        URLs that will match those screens. As you do so, identify the different
        bits of information you need to assemble to build out the screen.
      </Paragraph>
      <Paragraph>
        You can handle almost any data model with DynamoDB provided that you
        design for your access patterns up front.
      </Paragraph>

      <SectionTitle>3: Model your primary key structure</SectionTitle>
      <Paragraph>
        The primary key is the foundation of your table, so you should start
        there. I model my primary key using the following four steps.
      </Paragraph>
      <Paragraph>
        {`First, I create an 'entity chart' that is used to track the different
        types of items I’ll have in my table. The entity chart tracks the type
        of item, the primary key structure for each item, and any additional
        notes and properties.`}
      </Paragraph>
      <Paragraph>
        After deciding the entities and relationships to model, the second step
        is to decide on a simple or composite primary key.
      </Paragraph>
      <Paragraph>
        The last step is to start designing the primary key format for each
        entity type.
      </Paragraph>
      <Paragraph>
        There’s no one-size-fits-all approach to designing your primary key, but
        there are a few principles you should keep in mind:
      </Paragraph>
      <Paragraph className="font-bold">
        - Consider what your client will know at read time
      </Paragraph>
      <Paragraph>
        For example, if the URL to fetch a particular user is
        https://api.mydomain.com/users/antonychiramel, where antonychiramel is
        the username, you can safely include username in the primary key as the
        username will be available on the API request
      </Paragraph>
      <Paragraph className="font-bold">
        - Use primary key prefixes to distinguish between entity types
      </Paragraph>
      <Paragraph>
        {`One thing to do is use a prefixing system on my primary keys to help identify the type of entity that is being referenced. For example, if I have Customers and CustomerOrders in a table, my pattern for Customers might be CUSTOMER#<CustomerId> for the partition key and METADATA#<CustomerId> on the sort key. For the CustomerOrder, the pattern might be ORDER#<OrderId> for the partition key and METADATA#<OrderId> for the sort key.`}
      </Paragraph>

      <SectionTitle>
        4: Handle additional access patterns with secondary indexes and streams
      </SectionTitle>
      <Paragraph>
        You won’t always be able to model everything with your primary key.
        That’s where you start thinking about secondary indexes. Secondary
        indexes are a powerful tool for enabling additional read patterns on
        your DynamoDB table.
      </Paragraph>
      <Paragraph>
        Use generic attribute names like GSI1PK and GSI1SK for your secondary
        indexes and handle multiple access patterns within a single secondary
        index.
      </Paragraph>

      <Footer previous="/chapter_7/7.1" next="/chapter_8" />
    </main>
  );
}
