import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";
import CustomTable from "@/components/custom/CustomTable";

const tableHeaders = [
  "AuthorName",
  "BookName",
  "AuthorBirthDate",
  "ReleaseYear",
];
const tableData = [
  {
    AuthorName: "Stephen King",
    BookName: "It",
    AuthorBirthDate: "21st Sep, 1947",
    ReleaseYear: "1986",
  },
  {
    AuthorName: "Stephen King",
    BookName: "The Shining",
    AuthorBirthDate: "21st Sep, 1947",
    ReleaseYear: "1977",
  },
  {
    AuthorName: "JK Rowling",
    BookName: "Harry Potter and the Sorcerer's Store",
    AuthorBirthDate: "31st Jul, 1965",
    ReleaseYear: "1997",
  },
];

export default function Chapter_11_2() {
  return (
    <main>
      <PageTitle>11.2: Denormalization by duplicating data</PageTitle>
      <Paragraph>
        Here, we’ll violate the principles of second normal form by duplicating
        data across multiple items.
      </Paragraph>
      <Paragraph>
        To get to second normal form, each non-key attribute must depend on the
        whole key. This is a confusing way to say that data should not be
        duplicated across multiple records. If data is duplicated, it should be
        pulled out into a separate table. Each record that uses that data should
        refer to it via a foreign key reference.
      </Paragraph>

      <Paragraph>
        Imagine we have an application that contains Books and Authors. Each
        Book has an Author, and each Author has some biographical information,
        such as their name and birth year.
      </Paragraph>

      <Paragraph>
        In a RDS database we would have two separate tables for books and
        authors, where no data gets duplicated. But look at the DynamoDb table
        below. We can ignore the rules of second normal form and include the
        Author’s biographical information on each Book item.
      </Paragraph>

      <CustomTable headers={tableHeaders} tableData={tableData} />

      <Paragraph>
        Notice that there are multiple Books that contain the biographical
        information for the Author Stephen King. Because this information won’t
        change, we can store it directly on the Book item itself. Whenever we
        retreive the Book, we will also get information about the parent Author
        item.
      </Paragraph>

      <Paragraph className="mt-4">
        There are two main questions you should ask when considering this
        strategy:
      </Paragraph>
      <Paragraph className="font-semibold">
        1: Is the duplicated information immutable?
      </Paragraph>
      <Paragraph className="font-semibold">
        2: If the data does change, how often does it change and how many items
        include the duplicated information?
      </Paragraph>

      <Paragraph>
        In our example above, we’ve duplicated biographical information that
        isn’t likely to change. Because it’s essentially immutable, it’s OK to
        duplicate it without worrying about consistency issues when that data
        changes.
      </Paragraph>
      <Paragraph>
        If the data changes fairly infrequently and the denormalized items are
        read a lot, it may be OK to duplicate to save money on all of those
        subsequent reads. When the duplicated data does change, you’ll need to
        work to ensure it’s changed in all those items.
      </Paragraph>
      <Paragraph>
        Which leads us to the second factor—how many items contain the
        duplicated data. If you’ve only duplicated the data across three items,
        it can be easy to find and update those items when the data changes. If
        that data is copied across thousands of items, it can be a real chore to
        discover and update each of those items, and you run a greater risk of
        data inconsistency.
      </Paragraph>

      <Footer previous="/chapter_11/11.1" next="/chapter_11/11.3" />
    </main>
  );
}
