import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function chapter_1_1() {
  return (
    <main>
      <PageTitle>1.1: Key Properties of DynamoDB</PageTitle>
      <SectionTitle>1: Key-value or wide-column data model</SectionTitle>
      <Paragraph>
        NoSQL databases come in a variety of flavors. There are document
        databases like MongoDB, column stores like Cassandra, and graph
        databases like Neo4J or Amazon Neptune.
      </Paragraph>
      <Paragraph>
        DynamoDB has support for two similar data models. First, you can use
        DynamoDB as a key-value store. Think of a key-value store like a giant,
        distributed hash table. The problem with a key-value store is that you
        can only retrieve one record at a time. But what if you want to retrieve
        multiple records? For example, I may want to fetch a Customer and all of
        the Customer’s Orders over the last 6 months.
      </Paragraph>
      <Paragraph>
        To handle these more complex access patterns, you can also use DynamoDB
        as a wide-column store. A wide-column store is like a super-charged
        version of a hash table where the value for each record in your hash
        table is a B-tree. You could think of a wide-column store as a bookshelf
        full of phone books, each one for a different city. The bookshelf is the
        hash table, and each phone book is a B-tree.
      </Paragraph>
      <SectionTitle>
        2: Infinite scaling with no performance degradation
      </SectionTitle>
      <Paragraph>
        DynamoDB was built to be fast and scalable, and it delivers on both
        counts. Most operations in DynamoDB have response times in single-digit
        milliseconds. If you need better than that, AWS offers DynamoDB
        Accelerator (DAX), which is a fully-managed in-memory cache for your
        DynamoDB table
      </Paragraph>
      <SectionTitle>3: HTTP connection model</SectionTitle>
      <Paragraph>
        All requests to DynamoDB are made to the DynamoDB API via HTTP requests.
        This is in contrast to most database systems that initialize persistent
        TCP connections that are reused many times over the lifetime of an
        application.
      </Paragraph>
      <SectionTitle>4: IAM authentication</SectionTitle>
      <Paragraph>
        DynamoDB uses AWS IAM for authentication and authorization of database
        requests rather than a username and password model that is common with
        other database systems.
      </Paragraph>
      <SectionTitle>5: Infrastructure-as-code friendly</SectionTitle>
      <Paragraph>
        Infrastructure-as-code is a pattern for managing application
        infrastructure in which all infrastructure needed for an application is
        described and maintained in code.
      </Paragraph>
      <Paragraph>
        DynamoDB works perfectly within an infrastructure-as-code workflow.
        Creating a DynamoDB table and specifying the primary key and secondary
        indexes can be done declaratively via Terraform and CloudFormation.
      </Paragraph>
      <SectionTitle>6: Flexible pricing model</SectionTitle>
      <Paragraph>
        DynamoDB is priced directly based on the amount of workload capacity you
        need. You specify the throughput you want in terms of Read Capacity
        Units and Write Capacity Units. A Read Capacity Unit gives you a single
        strongly-consistent read per second or two eventually-consistent reads
        per second, up to 4KB in size. A Write Capacity Unit allows you to write
        a single item per second, up to 1KB in size.
      </Paragraph>
      <Paragraph>
        If you don’t know your access patterns or don’t want to take the time to
        capacity plan your workload, you can use On-Demand Pricing from
        DynamoDB.
      </Paragraph>
      <SectionTitle>7: Change data capture with DynamoDB Streams</SectionTitle>
      <Paragraph>
        With DynamoDB Streams, you get a transactional log of each write
        transaction in your DynamoDB table. You can programmatically process
        this log, which opens up a huge number of use cases.
      </Paragraph>
      <SectionTitle>8: Fully-managed</SectionTitle>
      <Paragraph>
        You won’t need to spin up server instances, install software, manage
        failovers, handle backups, upgrade software, or handle any other basic
        database maintenance tasks.
      </Paragraph>
      <Footer previous="/chapter_1" next="/chapter_1/1.2" />
    </main>
  );
}
