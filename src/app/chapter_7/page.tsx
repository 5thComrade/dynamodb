import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_7() {
  return (
    <main>
      <PageTitle>
        Chapter 7: How to approach data modeling in DynamoDB
      </PageTitle>
      <Paragraph>
        In this chapter and the next few chapters, we will drill in on data
        modeling with DynamoDB. This chapter will look at how data modeling with
        a NoSQL database is different than a relational database, as well as the
        concrete steps you should follow when modeling with DynamoDB.
      </Paragraph>
      <Footer previous="/chapter_6/6.5" next="/chapter_7/7.1" />
    </main>
  );
}
