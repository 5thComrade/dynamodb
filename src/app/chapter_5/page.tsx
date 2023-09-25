import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_5() {
  return (
    <main>
      <PageTitle>Chapter 5: </PageTitle>
      <Paragraph>Hello World</Paragraph>
      <Footer previous="/chapter_4/4.4" next="/chapter_5/5.1" />
    </main>
  );
}
