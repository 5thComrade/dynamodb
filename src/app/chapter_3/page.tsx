import { PageTitle, Paragraph } from "@/components/custom/Typography";
import Footer from "@/components/custom/Footer";

export default function Chapter_3() {
  return (
    <main>
      <PageTitle>Chapter 3: Advanced Concepts</PageTitle>
      <Paragraph>Chapter 3</Paragraph>
      <Footer previous="/chapter_2/2.3" next="/" />
    </main>
  );
}
