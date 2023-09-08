import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_3_3() {
  return (
    <main>
      <PageTitle>3.3: Partitions</PageTitle>
      <Paragraph>
        We noted before that DynamoDB is built for infinite scale, and it does
        that by sharding your data across multiple server instances.
      </Paragraph>
      <Paragraph>
        When a request comes into DynamoDB, the request router looks at the
        partition key in the request and applies a hash function to it. The
        result of that hash function indicates the server where that data will
        be stored, and the request is forwarded to that server to read or write
        the data as requested. The beauty of this design is in how it
        scales—DynamoDB can add additional storage nodes infinitely as your data
        scales up.
      </Paragraph>
      <Paragraph>
        In earlier versions of DynamoDB, there were issues related to uneven
        throughput distribution and throughput dilution. The DynamoDB team has
        added a concept called adaptive capacity. With adaptive capacity,
        throughput is automatically spread around your table to the items that
        need it.
      </Paragraph>

      <Footer previous="/chapter_3/3.2" next="/chapter_3/3.4" />
    </main>
  );
}
