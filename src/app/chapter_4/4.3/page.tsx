import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_4_3() {
  return (
    <main>
      <PageTitle>4.3: Scan</PageTitle>
      <Paragraph>
        A Scan will grab everything in a table. If you have a large table, this
        will be infeasible in a single request, so it will paginate. Your first
        request in a Scan call will read a bunch of data and send it back to
        you, along with a pagination key. You’ll need to make another call,
        using the pagination key to indicate to DynamoDB where you left off.
      </Paragraph>

      <Paragraph>
        The times you may consider using the Scan operation are:
      </Paragraph>

      <Paragraph>1: When you have a very small table</Paragraph>
      <Paragraph>
        2: When you’re exporting all data from your table to a different system
      </Paragraph>
      <Paragraph>
        3: In exceptional situations, where you have specifically modeled a
        sparse secondary index in a way that expects a scan.
      </Paragraph>

      <Footer previous="/chapter_4/4.2" next="/chapter_4/4.4" />
    </main>
  );
}
