import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_11_1() {
  return (
    <main>
      <PageTitle>11.1: Denormalization by using a complex attribute</PageTitle>
      <Paragraph>
        Database normalization is a key component of relational database
        modeling and one of the hardest habits to break when moving to DynamoDB.
      </Paragraph>
      <Paragraph>
        The first way we’ll use denormalization with DynamoDB is by having an
        attribute that uses a complex data type, like a list or a map.
      </Paragraph>
      <Paragraph>
        For example, a single Customer can have multiple shipping addresses to
        which they may ship items. We will have a ShippingAddresses attribute on
        the Customer item. This attribute is a map and contains all addresses
        for the given customer.
      </Paragraph>

      <Footer previous="/chapter_11" next="/chapter_11/11.2" />
    </main>
  );
}
