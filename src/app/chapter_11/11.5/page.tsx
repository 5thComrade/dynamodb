import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CustomTable from "@/components/custom/CustomTable";

const tableHeaders = [
  "Country",
  "STATE#CITY#ZIP",
  "StreetAddress",
  "SquareFeet",
];
const tableData = [
  {
    Country: "USA",
    "STATE#CITY#ZIP": "NE#OMAHA#68118",
    StreetAddress: "#100 St Andrews lane",
    SquareFeet: "921",
  },
  {
    Country: "USA",
    "STATE#CITY#ZIP": "NY#NEWYORKCITY#10001",
    StreetAddress: "#675 6th Ave",
    SquareFeet: "1211",
  },
  {
    Country: "USA",
    "STATE#CITY#ZIP": "NY#NEWYORKCITY#10019",
    StreetAddress: "1500 Broadway",
    SquareFeet: "1924",
  },
  {
    Country: "FRANCE",
    "STATE#CITY#ZIP": "ILE-DE-FRANCE#PARIS#75001",
    StreetAddress: "26 Avenue de I'Opera",
    SquareFeet: "2102",
  },
];

export default function Chapter_11_5() {
  return (
    <main>
      <PageTitle>11.5: Composite sort keys with hierarchical data</PageTitle>
      <Paragraph>
        In the last two strategies, we saw some data with a couple levels of
        hierarchy—an Organization has Users, which create Tickets. But what if
        you have more than two levels of hierarchy? You don’t want to keep
        adding secondary indexes to enable arbitrary levels of fetching
        throughout your hierarchy.
      </Paragraph>

      <Paragraph>
        A common example in this area is around location-based data. Let’s keep
        with our workplace theme and imagine you’re tracking all the locations
        of Starbucks around the world. You want to be able to filter Starbucks
        locations on arbitrary geographic levels—by country, by state, by city,
        or by zip code.
      </Paragraph>

      <Paragraph>
        We could solve this problem by using a composite sort key. The term
        composite sort key means that we’ll be smashing a bunch of properties
        together in our sort key to allow for different search granularity.
      </Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph>
        In our table, the partition key is the country where the Starbucks is
        located. For the sort key, we include the State, City, and ZipCode, with
        each level separated by a #. With this pattern, we can search at four
        levels of granularity using just our primary key!
      </Paragraph>

      <Paragraph className="my-4">The patterns are:</Paragraph>

      <Paragraph>{`1: Find all locations in a given country. Use a Query with a key condition expression of PK = <Country>, where Country is the country you want.`}</Paragraph>
      <Paragraph>{`2: Find all locations in a given country and state. Use a Query with a condition expression of PK = <Country> AND begins_with(SK, '<State>#').`}</Paragraph>
      <Paragraph>{`3: Find all locations in a given country, state, and city. Use a Query with a condition expression of PK = <Country> AND begins_with(SK, '<State>#<City>').`}</Paragraph>
      <Paragraph>{`4: Find all locations in a given country, state, city, and zip code. Use a Query with a condition expression of PK = <Country> AND begins_with(SK, '<State>#<City>#<ZipCode>').`}</Paragraph>

      <Paragraph className="my-3">It works best when:</Paragraph>
      <Paragraph>{`1: You have many levels of hierarchy (>2), and you have access patterns for different levels within the hierarchy.`}</Paragraph>
      <Paragraph>{`2: When searching at a particular level in the hierarchy, you want all subitems in that level rather than just the items in that level.`}</Paragraph>

      <Footer previous="/chapter_11/11.4" next="/chapter_12" />
    </main>
  );
}
