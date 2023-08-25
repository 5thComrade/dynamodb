import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_1_2() {
  return (
    <main>
      <PageTitle>1.2: When to use DynamoDB?</PageTitle>
      <SectionTitle>1: Hyperscale</SectionTitle>
      <Paragraph>
        The first core use case for DynamoDB is for hyper-scale applications.
        There were two problems with Relational Databases <br />
        1:{" "}
        <strong>
          Inability to use advanced relational features at scale.
        </strong>{" "}
        As Amazon scaled up their operations, they couldn’t use costly
        operations like joins because they were too slow and resource-intensive.{" "}
        <br />
        2: <strong>Ability to relax relational constraints.</strong> Relational
        databases had strict consistency functionality, which roughly means that
        clients will see the same data if querying at the same time.
      </Paragraph>
      <Paragraph>
        The engineers behind the Dynamo Paper realized the power of relaxing the
        two constraints above. This allowed them to shard application data
        across machines without a loss of application performance. Not only
        that, it allowed them to scale essentially infinitely without any
        performance degradation.
      </Paragraph>

      <SectionTitle>
        2: {`Hyper-ephemeral compute (aka 'Serverless')`}
      </SectionTitle>
      <Paragraph>
        DynamoDB is a perfect fit for hyper-ephemeral applications. All access
        is over HTTP and uses AWS IAM for authentication. AWS is able to handle
        surges in traffic by using a shared Request Router across instances,
        which authenticates and validates your request before sending it to the
        proper shard for processing.
      </Paragraph>

      <SectionTitle>2: Other situations</SectionTitle>
      <Paragraph>
        1: <strong>Most OLTP applications:</strong> OLTP applications are those
        where end users are reading and writing small bits of data at high
        speeds. <br /> 2: <strong>Caching:</strong> DynamoDB can be used as a
        cache to store the results of complex, frequently-accessed queries from
        other databases or other operations. You won’t get the same level of
        performance as you would with a fully in-memory cache like Redis, but
        DynamoDB can be a fast, low-maintenance, cost-effective solution for
        specific use cases. <br /> 3: <strong>Simple data models:</strong> If
        you have a simple data model that doesn’t require complex querying,
        DynamoDB is a great fit, especially when you are mostly doing key-value
        lookups.
      </Paragraph>
      <Footer previous="/chapter_1/1.1" next="/chapter_1/1.3" />
    </main>
  );
}
