import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_9_5() {
  return (
    <main>
      <PageTitle>9.5: Write scripts to help debug access patterns</PageTitle>
      <Paragraph>
        I recommend writing little scripts that can be used to debug your access
        patterns. These scripts can be called via a command-line interface (CLI)
        in the terminal. A script should take the parameters required for an
        access pattern—a username or an order ID—and pass that to your data
        access code. Then it can print out the results.
      </Paragraph>

      <Paragraph>
        For a simple access pattern to fetch a single item, it may not seem that
        helpful. However, if you’re retrieving multiple related items from a
        global secondary index with complex conditions on the sort key, these
        little scripts can be lifesavers. Write them at the same time you’re
        implementing your data model.
      </Paragraph>

      <Footer previous="/chapter_9/9.4" next="/chapter_9/9.6" />
    </main>
  );
}
