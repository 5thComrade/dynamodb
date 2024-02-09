import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_10() {
  return (
    <main>
      <PageTitle>Chapter 10: The Importance of Strategies</PageTitle>
      <Paragraph>
        We’ve covered a lot of ground already about the basics of DynamoDB, and
        the second half of this book contains a number of data modeling
        examples. There’s no substitute for seeing a full example of a DynamoDB
        table in action to really grok how the modeling works.
      </Paragraph>
      <Paragraph>
        Before we look at those examples, though, we’re going to cover a concept
        that’s essential when it comes to modeling well with DynamoDB—namely,
        strategies. In order to succeed with DynamoDB, it is crucial to
        understand and be able to apply a variety of strategies for modeling
        your data.
      </Paragraph>

      <Paragraph>
        With DynamoDB, on the other hand, there are multiple ways to approach
        the problem, and you need to use judgment as to which approach works
        best for your situation. DynamoDB modeling is more art than science—two
        people modeling the same application can have vastly different table
        designs.
      </Paragraph>

      <Paragraph className="mt-4">
        Let’s look at one example from above—modeling a one-to-many
        relationship. In the next chapter, we cover five different ways to model
        one-to-many relationships in DynamoDB:
      </Paragraph>

      <Paragraph>
        1: Denormalizing the data and storing the nested objects as a document
        attribute
      </Paragraph>

      <Paragraph>
        2: Denormalizing the data by duplicating it across multiple items
      </Paragraph>

      <Paragraph>3: Using a composite primary key</Paragraph>

      <Paragraph>4: Creating a secondary index</Paragraph>

      <Paragraph>
        5: Using a composite sort key to handle hierarchical data
      </Paragraph>

      <Paragraph className="mt-4">
        Knowing these strategies is important for success in data modeling. As
        you gain experience, you’ll learn to attack your application data model
        one access pattern at a time, searching for the right strategy to solve
        the immediate problem. Your model will come together like the pieces in
        a puzzle with each different strategy helping to achieve the ultimate
        goal.
      </Paragraph>
      <Paragraph>
        Data modeling with DynamoDB requires flexibility, creativity, and
        persistence. It can be frustrating, but it can also be a lot of fun.
      </Paragraph>
      <Paragraph>
        In the next six chapters, we’ll look at some of the strategies you can
        use in modeling with DynamoDB.
      </Paragraph>
      <Footer previous="/chapter_9/9.6" next="/chapter_11" />
    </main>
  );
}
