import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  previous: string;
  next: string;
};

export default function Footer({ previous, next }: Props) {
  return (
    <footer className="my-8 flex w-full items-center justify-between">
      <Link href={previous}>
        <Button variant="outline" className="text-lg">
          <ChevronLeft size={32} strokeWidth={1} /> Previous
        </Button>
      </Link>

      <Link href={next}>
        <Button variant="outline" className="text-lg">
          Next <ChevronRight size={32} strokeWidth={1} />
        </Button>
      </Link>
    </footer>
  );
}
