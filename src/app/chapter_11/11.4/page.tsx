import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CustomTable from "@/components/custom/CustomTable";

const tableHeaders = [
  "pk",
  "sk",
  "OrgName",
  "PlanType",
  "CreatedDate",
  "UserName",
  "UserType",
  "GSI1PK",
  "GSI1SK",
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
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "USER#BILLGATES",
  },
  {
    pk: "ORG#MICROSOFT",
    sk: "USER#SATYANADELLA",
    UserName: "Satya Nadella",
    UserType: "Admin",
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "USER#BILLGATES",
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
    GSI1PK: "ORG#AMAZON#USER#JEFFBEZOS",
    GSI1SK: "USER#JEFFBEZOS",
  },
  {
    pk: "TICKET#123",
    sk: "TICKET#123",
    CreatedDate: "2023-09-05 22:31:54",
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "TICKET#123",
  },
  {
    pk: "TICKET#456",
    sk: "TICKET#456",
    CreatedDate: "2024-09-05 22:31:54",
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "TICKET#456",
  },
];

const tableHeaders_gsi = [
  "GSI1PK",
  "GSI1SK",
  "pk",
  "sk",
  "CreatedDate",
  "UserName",
  "UserType",
];
const tableData_gsi = [
  {
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "TICKET#123",
    pk: "TICKET#123",
    sk: "TICKET#123",
    CreatedDate: "2023-09-05 22:31:54",
  },
  {
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "TICKET#456",
    pk: "TICKET#456",
    sk: "TICKET#456",
    CreatedDate: "2024-09-05 22:31:54",
  },
  {
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "USER#BILLGATES",
    pk: "ORG#MICROSOFT",
    sk: "USER#BILLGATES",
    UserName: "Bill Gates",
    UserType: "Member",
  },
  {
    GSI1PK: "ORG#MICROSOFT#USER#BILLGATES",
    GSI1SK: "USER#SATYANADELLA",
    pk: "ORG#MICROSOFT",
    sk: "USER#SATYANADELLA",
    UserName: "Satya Nadella",
    UserType: "Admin",
  },
  {
    GSI1PK: "ORG#AMAZON#USER#JEFFBEZOS",
    GSI1SK: "USER#JEFFBEZOS",
    pk: "ORG#AMAZON",
    sk: "USER#JEFFBEZOS",
    UserName: "Jeff Bezos",
    UserType: "Admin",
  },
];

export default function Chapter_11_4() {
  return (
    <main>
      <PageTitle>11.4: Secondary index + the Query API action</PageTitle>

      <Paragraph>
        A similar pattern for one-to-many relationships is to use a global
        secondary index and the Query API to fetch multiple items in a single
        request. This pattern is almost the same as the previous pattern, but it
        uses a secondary index rather than the primary keys on the main table.
      </Paragraph>

      <Paragraph>
        Imagine we use the same dataset as the previous chapter. Lets say our
        item collection now has organization data, user data and also support
        ticket data(users can raise support ticket data). If I want to retrieve
        an Organization and all its Users, I’m also retrieving a bunch of
        Tickets. And since Tickets are likely to vastly exceed the number of
        Users, I’ll be fetching a lot of useless data and making multiple
        pagination requests to handle our original use case.
      </Paragraph>

      <Paragraph>
        Instead, let’s try something different. We’ll do three things:
      </Paragraph>

      <Paragraph>{`1: We’ll model our Ticket items to be in a separate item collection altogether in the main table. For the PK and SK values, we’ll use a pattern of TICKET#<TicketId> which will allow for direct lookups of the Ticket item.`}</Paragraph>
      <Paragraph>{`2: Create a global secondary index named GSI1 whose keys are GSI1PK and GSI1SK.`}</Paragraph>
      <Paragraph>{`3: For both our Ticket and User items, add values for GSI1PK and GSI1SK. For both items, the GSI1PK attribute value will be ORG#<OrgName>#USER#<UserName>. For the User item, the GSI1SK value will be USER#<UserName>. For the Ticket item, the GSI1SK value will be TICKET#<TicketId>.`}</Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph>
        Notice that our Ticket items are no longer interspersed with their
        parent Users in the base table. Further, the User items now have
        additional GSI1PK and GSI1SK attributes that will be used for indexing.
      </Paragraph>

      <Paragraph>
        If we look at our GSI1 secondary index, we see the following:
      </Paragraph>

      <CustomTable headers={tableHeaders_gsi} tableData={tableData_gsi} />

      <Paragraph>
        This secondary index has an item collection with both the User item and
        all of the user’s Ticket items. This enables the same access patterns we
        discussed in the previous chapter.
      </Paragraph>

      <Paragraph className="mt-4 font-semibold">
        One last note before moving on—notice that I’ve structured it so that
        the User item is the last item in the partition. This is because the
        Tickets are sorted by timestamp (TICKET#123 is older than TICKET#456).
        It’s likely that I’ll want to fetch a User and the User’s most recent
        Tickets, rather than the oldest tickets. As such, I order it so that the
        User is at the end of the item collection, and I can use the
        ScanIndexForward=False property to indicate that DynamoDB should start
        at the end of the item collection and read backwards.
      </Paragraph>

      <Footer previous="/chapter_11/11.3" next="/chapter_11/11.5" />
    </main>
  );
}
