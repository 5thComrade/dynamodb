import Footer from "@/components/custom/Footer";
import { PageTitle, Paragraph } from "@/components/custom/Typography";
import GetCustomersUsingProjection from "../_components/GetCustomersUsingProjection";

export default function chapter_6_3() {
  return (
    <main>
      <PageTitle>6.3: Projection expressions</PageTitle>
      <Paragraph>
        A projection expression is used to specify exactly the attributes you
        want to receive from the DynamoDB server. A projection expression is
        similar to a filter expression in that its main utility is in reducing
        the amount of data sent over the wire in your response.
      </Paragraph>
      <Paragraph>
        Let us write a Query command that returns all the customers but only
        their firstname, lastname and phone. We do not need email and zipcode
        here.
      </Paragraph>

      <GetCustomersUsingProjection />

      <Paragraph className="mt-6">
        The projection expression can also be used to access nested properties,
        such as in a list or map attribute. If you have a large object and you
        know the exact property you want, you can really cut down on the
        bandwidth by specifying only the elements that you need.
      </Paragraph>
      <Paragraph>
        Projection expressions are subject to the same caveats as filter
        expressions—they are evaluated after the items are read from the table
        and the 1MB limit is reached.
      </Paragraph>
      <Footer previous="/chapter_6/6.2" next="/chapter_6/6.4" />
    </main>
  );
}
