import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CustomTable from "@/components/custom/CustomTable";

const tableHeaders = [
  "pk",
  "sk",
  "OrgName",
  "PlanType",
  "UserName",
  "UserType",
];
const tableData = [
  {
    pk: "ORG#MICROSOFT",
    sk: "METADATA#MICROSOFT",
    OrgName: "Microsoft",
    PlanType: "Enterprise",
  },
  {
    pk: "ORG#MICROSOFT",
    sk: "USER#BILLGATES",
    UserName: "Bill Gates",
    UserType: "Member",
  },
  {
    pk: "ORG#MICROSOFT",
    sk: "USER#SATYANADELLA",
    UserName: "Satya Nadella",
    UserType: "Admin",
  },
  {
    pk: "ORG#AMAZON",
    sk: "METADATA#AMAZON",
    OrgName: "Amazon",
    PlanType: "Pro",
  },
  {
    pk: "ORG#AMAZON",
    sk: "USER#JEFFBEZOS",
    UserName: "Jeff Bezos",
    UserType: "Admin",
  },
];

export default function Chapter_11_3() {
  return (
    <main>
      <PageTitle>11.3: Composite primary key + the Query API action</PageTitle>
      <Paragraph>
        The next strategy to model one-to-many relationships—and probably the
        most common way—is to use a composite primary key plus the Query API to
        fetch an object and its related sub- objects.
      </Paragraph>
      <Paragraph>
        Item collections are all the items in a table or secondary index that
        share the same partition key. When using the Query API action, you can
        fetch multiple items within a single item collection.
      </Paragraph>

      <Paragraph>The table below shows some example items:</Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph>
        Notice how there are two different item types in the item collection. We
        have an Organization item type and User item type.
      </Paragraph>

      <Paragraph>
        This primary key design makes it easy to solve four access patterns:
      </Paragraph>
      <Paragraph>{`1: Retrieve an Organization. Use the GetItem API call and the Organization’s name to make a request for the item with a PK of ORG#<OrgName> and an SK of METADATA#<OrgName>.`}</Paragraph>
      <Paragraph>{`2: Retrieve an Organization and all Users within the Organization. Use the Query API action with a key condition expression of PK
= ORG#<OrgName>. This would retrieve the Organization and all Users within it, as they all have the same partition key.`}</Paragraph>
      <Paragraph>{`3: Retrieve only the Users within an Organization. Use the Query API action with a key condition expression of PK = ORG#<OrgName> AND begins_with(SK, "USER#"). The use of the begins_with() function allows us to retrieve only the Users without fetching the Organization object as well.`}</Paragraph>
      <Paragraph>{`4: Retrieve a specific User. If you know both the Organization name and the User’s username, you can use the GetItem API call with a PK of ORG#<OrgName> and an SK of USER#<Username> to fetch the User item.
`}</Paragraph>

      <Footer previous="/chapter_11/11.2" next="/chapter_11/11.4" />
    </main>
  );
}
