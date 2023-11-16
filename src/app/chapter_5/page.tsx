import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_5() {
  return (
    <main>
      <PageTitle>Chapter 5: Using the DynamoDB API</PageTitle>
      <Paragraph>
        The biggest hurdle in learning DynamoDB is the mindset shift required in
        learning the data modeling principles. Once you get the principles down
        and have written out your access patterns for a particular model,
        translating those patterns into the proper API calls is usually much
        easier.
      </Paragraph>
      <Paragraph>
        That said, it is helpful to know a few of the tricky bits and hidden
        areas of the DynamoDB API. We’ll focus on those here.
      </Paragraph>
      <Footer previous="/chapter_4/4.4" next="/chapter_5/5.1" />
    </main>
  );
}
