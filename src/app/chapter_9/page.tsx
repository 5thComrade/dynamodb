import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_9() {
  return (
    <main>
      <PageTitle>Chapter 9: From modeling to implementation</PageTitle>
      <Paragraph>
        90% of the work of using DynamoDB happens in the planning stage, before
        you write a single line of code.
      </Paragraph>
      <Paragraph>
        At some point, however, you need to move from model to implementation.
        This chapter includes guidance on how to implement your DynamoDB data
        model in your application code.
      </Paragraph>
      <Footer previous="/chapter_8/8.3" next="/chapter_9/9.1" />
    </main>
  );
}
