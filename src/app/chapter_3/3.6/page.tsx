import { PageTitle, Paragraph } from "@/components/custom/Typography";
import CustomTable from "@/components/custom/CustomTable";
import Footer from "@/components/custom/Footer";

const tableHeaders = [
  "PK",
  "SK",
  "OrgName",
  "UserName",
  "SubscriptionLevel",
  "Role",
];
const tableData = [
  {
    PK: "ORG#BERKSHIRE",
    SK: "ORG#BERKSHIRE",
    OrgName: "Berkshire Hathaway",
    UserName: "",
    SubscriptionLevel: "Enterprise",
    Role: "",
  },
  {
    PK: "ORG#BERKSHIRE",
    SK: "USER#CHARLIEMUNGER",
    OrgName: "",
    UserName: "Charlie Munger",
    SubscriptionLevel: "",
    Role: "Member",
  },
  {
    PK: "ORG#BERKSHIRE",
    SK: "USER#WARRENBUFFETT",
    OrgName: "",
    UserName: "Warren Buffett",
    SubscriptionLevel: "",
    Role: "Admin",
  },
  {
    PK: "ORG#FACEBOOK",
    SK: "ORG#FACEBOOK",
    OrgName: "Facebook",
    UserName: "",
    SubscriptionLevel: "Pro",
    Role: "",
  },
  {
    PK: "ORG#FACEBOOK",
    SK: "USER#SHERYLSANDBERG",
    OrgName: "",
    UserName: "Sheryl Sandberg",
    SubscriptionLevel: "",
    Role: "Admin",
  },
];

export default function chapter_3_6() {
  return (
    <main>
      <PageTitle>3.6: Overloading keys and indexes</PageTitle>
      <Paragraph>
        One unique quirk of modeling with DynamoDB is that you will often
        include different types of entities in a single table.
      </Paragraph>
      <Paragraph className="my-4">Refer to the table below</Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph>
        {`First, notice how generic the names of the partition key and sort key
        are. Rather than having the partition key named 'OrgName', the partition
        key is titled PK, and the sort key is SK. That’s because this table also has User items, and Users don’t have an OrgName. They have a UserName.`}
      </Paragraph>
      <Paragraph>
        {`Second, notice that the PK and SK values have prefixes. The pattern is ORG#<OrgName> or USER#<UserName>. We do this for a few reasons. First, it helps to identify the type of item that we’re looking at. Second, it helps avoid overlap between different item types in a table. Remember that a primary key must be unique across all items in a table. If we didn’t have this prefix, we could run into accidental overwrites.`}
      </Paragraph>

      <Paragraph className="my-2 font-semibold">
        This concept of using generic names for your primary keys and using
        different values depending on the type of item is known as overloading
        your keys.
      </Paragraph>

      <Footer previous="/chapter_3/3.5" next="/chapter_4" />
    </main>
  );
}
