import Footer from "@/components/custom/Footer";
import { PageTitle, Paragraph } from "@/components/custom/Typography";
import { Separator } from "@/components/ui/separator";
import GetCustomers from "../_components/GetCustomers";
import GetCustomerFromPhone from "../_components/GetCustomerFromPhone";

export default function chapter_6_1() {
  return (
    <main>
      <PageTitle>6.1: Key Condition Expressions</PageTitle>
      <Paragraph>
        It is used on every Query operation to describe which items you want to
        fetch. Remember that the Query API call must include a partition key in
        the request. It may also include conditions on the sort key in the
        request.
      </Paragraph>
      <Paragraph className="font-semibold">
        A key condition can be used only on elements of the primary key, not on
        other attributes on the items.
      </Paragraph>

      <Paragraph className="mt-4">
        Lets start with a simple Query request using just the partition key.
        Remember the customers we added in the starting of this chapter, lets
        now retrieve all the customers.
      </Paragraph>

      <GetCustomers />

      <Separator className="mt-4 bg-black" />
      <Separator className="mt-1 bg-black" />

      <Paragraph className="mt-4">
        You can also use conditions on the sort key in your key condition
        expression. This is useful for finding a specific subset of your data.
        All elements with a given partition key are sorted according to the sort
        key (hence the name).
      </Paragraph>
      <Paragraph>
        In our example, we could use it to find a customer using their phone
        number.
      </Paragraph>

      <GetCustomerFromPhone />

      <Footer previous="/chapter_6" next="/chapter_6/6.2" />
    </main>
  );
}
