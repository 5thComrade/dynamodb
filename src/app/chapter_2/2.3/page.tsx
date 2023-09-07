import { PageTitle, Paragraph } from "@/components/custom/Typography";
import CustomTable from "@/components/custom/CustomTable";
import Footer from "@/components/custom/Footer";

const tableHeaders = ["Actor", "Movie", "Role", "Year", "Genre"];
const tableData = [
  {
    Actor: "Tom Hanks",
    Movie: "Cast Away",
    Role: "Chuck Noland",
    Year: 2000,
    Genre: "Drama",
  },
  {
    Actor: "Tom Hanks",
    Movie: "Toy Story",
    Role: "Woody",
    Year: 1995,
    Genre: "Comedy",
  },
  {
    Actor: "Tim Allen",
    Movie: "Toy Story",
    Role: "Buzz Lightyear",
    Year: 1995,
    Genre: "Comedy",
  },
  {
    Actor: "Natalie Portman",
    Movie: "Black Swan",
    Role: "Nina Sayers",
    Year: 2010,
    Genre: "Drama",
  },
];

export default function chapter_2_3() {
  return (
    <main>
      <PageTitle>2.3: The importance of item collections</PageTitle>
      <Paragraph>
        An item collection refers to a group of items that share the same
        partition key in either the base table or a secondary index.
      </Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph className="mt-4">
        In the table above, we see that there are two movies with the same
        partition key ie: Tom Hanks. Those two movie items are said to be in the
        same item collection. Likewise, the single movie role for Natalie
        Portman is in an item collection, even though it only has one item in
        it.
      </Paragraph>
      <Paragraph>Item collections are important for two reasons.</Paragraph>
      <Paragraph>
        - They are useful for partitioning. DynamoDB partitions your data across
        a number of nodes in a way that allows for consistent performance as you
        scale. However, all items with the same partition key will be kept on
        the same storage node.
      </Paragraph>
      <Paragraph>
        - Item collections are useful for data modeling. The Query action can
        retrieve multiple items within a single item collection. It is an
        efficient yet flexible operation.
      </Paragraph>

      <Footer previous="/chapter_2/2.2" next="/chapter_3" />
    </main>
  );
}
