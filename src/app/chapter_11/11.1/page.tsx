import Link from "next/link";
import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import GetCustomers from "@/app/chapter_6/_components/GetCustomers";
import { Separator } from "@/components/ui/separator";

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

      <Paragraph className="mt-3">
        You can add a new customer{" "}
        <Link href="/chapter_6">
          <span className="text-blue-500">here</span>
        </Link>
        .
      </Paragraph>

      <GetCustomers />

      <Separator className="mt-4 bg-black" />
      <Separator className="mt-4 bg-black" />

      <Paragraph className="mt-4">
        There are two factors to consider when deciding whether to handle a
        one-to-many relationship by denormalizing with a complex attribute:
      </Paragraph>
      <Paragraph className="font-semibold">
        1: Do you have any access patterns based on the values in the complex
        attribute?
      </Paragraph>
      <Paragraph>
        All data access in DynamoDB is done via primary keys and secondary
        indexes. You cannot use a complex attribute like a list or a map in a
        primary key. Thus, you won’t be able to make queries based on the values
        in a complex attribute.
      </Paragraph>

      <Paragraph className="font-semibold">
        2: Is the amount of data in the complex attribute unbounded?
      </Paragraph>
      <Paragraph>
        A single DynamoDB item cannot exceed 400KB of data. If the amount of
        data that is contained in your complex attribute is potentially
        unbounded, it won’t be a good fit for denormalizing and keeping together
        on a single item.
      </Paragraph>

      <Paragraph className="mt-4">
        {`If the answer to either of the questions above is "Yes", then
        denormalization with a complex attribute is not a good fit to model that
        one-to-many relationship.`}
      </Paragraph>
      <Footer previous="/chapter_11" next="/chapter_11/11.2" />
    </main>
  );
}
