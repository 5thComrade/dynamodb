import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_2() {
  return (
    <main>
      <PageTitle>Chapter 2: Core Concepts in DynamoDB</PageTitle>
      <Paragraph>
        This chapter will introduce the vocabulary of DynamoDB—tables, items,
        attributes, etc. --with comparisons to relational databases where
        relevant. Then we’ll take a deeper look at primary keys, secondary
        indexes, and item collections, which are three of the foundational
        concepts in DynamoDB.
      </Paragraph>
      <Footer previous="/chapter_1/1.2" next="/chapter_2/2.1" />
    </main>
  );
}
