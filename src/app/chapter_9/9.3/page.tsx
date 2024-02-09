import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CodeBlock from "@/components/custom/CodeBlock";

export default function Chapter_9_3() {
  return (
    <main>
      <PageTitle>9.3: Don’t reuse attributes across multiple indexes</PageTitle>
      <Paragraph>
        As discussed, you will have indexing attributes that are solely for
        properly indexing your data in DynamoDB. Let’s print out a dummy User
        object to see its attributes.
      </Paragraph>

      <CodeBlock>
        {`
        {
            "PK": { "S": "USER#antonychiramel" },
            "SK": { "S": "USER#antonychiramel" },
            "GSI1PK": { "S": "ORG#facebook" },
            "GSI1SK": { "S": "USER#antonychiramel" },
            "Username": { "S": "antonychiramel" },
            "FirstName": { "S": "Antony" },
            "LastName": { "S": "Chiramel" },
            "OrganizationName": { "S": "Facebook" },
            ...
        }`}
      </CodeBlock>

      <Paragraph>
        You may notice that SK and GSI1SK are the same value. And because
        they’re the same value, you may be tempted to skip adding GSI1SK
        altogether and make your GSI1 index use a key schema of GSI1PK and SK.
      </Paragraph>

      <Paragraph className="font-semibold">Don’t do this.</Paragraph>

      <Paragraph>
        {`While you are saving some money in storage by not duplicating
        attributes, it will make your data modeling more difficult. Save yourself the pain. For each global secondary index you use, give it a generic name of GSI<Number>. Then, use GSI<Number>PK and GSI<Number>SK for your attribute types.`}
      </Paragraph>

      <Footer previous="/chapter_9/9.2" next="/chapter_9/9.4" />
    </main>
  );
}
