import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_3() {
  return (
    <main>
      <PageTitle>Chapter 3: Advanced Concepts</PageTitle>
      <Paragraph>
        In this chapter, we’re going to cover some advanced concepts in
        DynamoDB.
      </Paragraph>
      <Paragraph>
        A few of these concepts, like DynamoDB streams and time-to-live (TTL)
        will allow you to handle more advanced use cases with DynamoDB. Other
        concepts, like partitions, consistency, and DynamoDB limits, will give
        you a better understanding of proper data modeling with DynamoDB.
        Finally, the concept of overloaded keys and indexes is a data modeling
        concept that will be used frequently in your data modeling.
      </Paragraph>
      <Footer previous="/chapter_2/2.3" next="/chapter_3/3.1" />
    </main>
  );
}
