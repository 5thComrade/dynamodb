import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_1() {
  return (
    <main>
      <PageTitle>Chapter 1: What is DynamoDB?</PageTitle>
      <Paragraph>
        Amazon DynamoDB is a fully managed, serverless, key-value NoSQL database
        designed to run high-performance applications at any scale. DynamoDB
        offers built-in security, continuous backups, automated multi-Region
        replication, in-memory caching, and data import and export tools.
      </Paragraph>
      <Footer previous="/requirements" next="/chapter_1/1.1" />
    </main>
  );
}
