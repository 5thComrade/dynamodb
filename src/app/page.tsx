import Link from "next/link";
import {
  PageTitle,
  Paragraph,
  SectionTitle,
} from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <main>
      <PageTitle>Introduction</PageTitle>
      <Paragraph>
        {`Welcome! If you're looking for an interactive and fun way to learn
          DynamoDB database, you have come to the right place. This application
          will teach its users how to data model in DynamoDB, it also covers topics like single-table design, various access patterns, query strategies and much more.`}
      </Paragraph>
      <SectionTitle>How exactly is this application interactive?</SectionTitle>
      <Paragraph>
        This application is not interactive yet. <br />
        You heard me right, this application is not interactive, however it
        requires you to follow a few steps before it turns interactive. <br />
        You see, DynamoDB is a proprietary database offering from AWS and its
        not free. Even though AWS offers a very generous free tier to explore
        its services I will not be able to open source my DynamoDB
        database(unless someone is ready to fund). <br />
        <span className="font-semibold">Bring your own database,</span> this is
        when the application becomes interactive. You will have to configure
        this application to use your own DynamoDB instance. In the{" "}
        <Link href="/requirements">
          <span className="text-blue-500">next chapter</span>
        </Link>{" "}
        you will see the steps that needs to be taken to ensure this application
        becomes interactive.
      </Paragraph>
      <SectionTitle>Open Source</SectionTitle>
      <Paragraph>
        This is a free and open source project. Free to use for personal and
        commercial projects. No attribution required.
      </Paragraph>
      <Paragraph>The github repo link is shared below.</Paragraph>
      <a
        href="https://github.com/5thComrade/dynamodb"
        target="_blank"
        rel="noreferrer"
        className="text-lg text-blue-500"
      >
        https://github.com/5thComrade/dynamodb
      </a>
      <SectionTitle>Maintainers</SectionTitle>
      <Paragraph>This application is maintained by</Paragraph>
      <a
        href="https://helloantony.in"
        target="_blank"
        rel="noreferrer"
        className="text-lg text-blue-500"
      >
        Antony Chiramel
      </a>

      <Footer previous="" next="/requirements" />
    </main>
  );
}
