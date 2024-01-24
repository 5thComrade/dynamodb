import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_8() {
  return (
    <main>
      <PageTitle>
        Chapter 8: The What, Why, and When of Single-Table Design in DynamoDB
      </PageTitle>
      <Paragraph>
        When modeling with DynamoDB, use as few tables as possible. Ideally, you
        can handle an entire application with a single table. This chapter
        discusses the reasons behind single-table design.
      </Paragraph>
      <Footer previous="/chapter_7/7.2" next="/chapter_8/8.1" />
    </main>
  );
}
