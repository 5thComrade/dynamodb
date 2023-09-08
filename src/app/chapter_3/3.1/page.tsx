import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_3_1() {
  return (
    <main>
      <PageTitle>3.1: DynamoDB Streams</PageTitle>
      <Paragraph>
        Streams are an immutable sequence of records that can be processed by
        multiple, independent consumers.
      </Paragraph>
      <Paragraph>
        Producers(application, IoT sensors) write to the stream - Streams
        persists immutable data - Consumers(microservice, marketing team,
        analytics team) can independently process stream data.
      </Paragraph>
      <Paragraph>
        With DynamoDB streams, you can create a stream of data that includes a
        record of each change to an item in your table. Whenever an item is
        written, updated, or deleted, a record containing the details of that
        record will be written to your DynamoDB stream. You can then process
        this stream with AWS Lambda or other compute infrastructure.
      </Paragraph>
      <Footer previous="/chapter_3" next="/chapter_3/3.2" />
    </main>
  );
}
