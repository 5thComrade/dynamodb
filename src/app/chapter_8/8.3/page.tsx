import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_8_3() {
  return (
    <main>
      <PageTitle>8.3: When not to use single-table design</PageTitle>
      <Paragraph>
        If you are looking for query flexibility and/or easier analytics more
        than the need for blazing fast performance.
      </Paragraph>
      <Paragraph>
        - in new applications where developer agility is more important than
        application performance
      </Paragraph>
      <Paragraph>- in applications using GraphQL</Paragraph>

      <SectionTitle>
        1: New applications that prioritize flexibility
      </SectionTitle>
      <Paragraph>
        It’s important to remember that while DynamoDB works great with
        serverless, it was not built for serverless. DynamoDB was built for
        large-scale, high-velocity applications that were outscaling the
        capabilities of relational databases. But if you’re making a greenfield
        application at a startup, it’s unlikely you absolutely require the
        scaling capabilities of DynamoDB to start, and you may not know how your
        application will evolve over time.
      </Paragraph>

      <SectionTitle>2: GraphQL & Single-table design</SectionTitle>
      <Paragraph>
        The second place where you may want to avoid single-table design with
        DynamoDB is in GraphQL applications.
      </Paragraph>
      <Paragraph>
        To understand why, let’s take a look at how GraphQL works and one of the
        main problems it aims to solve.
      </Paragraph>
      <Paragraph>
        In a REST-based API world, we may need to make multiple calls from the
        client to get all the necessary data for a page. With GraphQL, you can
        fetch all the data you need for a page in a single request. The web
        browser makes a single request to our backend server. The contents of
        that request will be our GraphQL query, as shown below the server. The
        GraphQL implementation will parse the query and handle it.
      </Paragraph>
      <Paragraph>
        The issue is in how GraphQL handles those resources in the backend. Each
        field on each type in your GraphQL schema is handled by a resolver. This
        resolver understands how to fill in the data for the field. The problem
        is that resolvers are essentially independent from each other. This
        would make subsequent requests to the database to resolve those
        entities.
      </Paragraph>

      <Footer previous="/chapter_8/8.2" next="/chapter_9" />
    </main>
  );
}
