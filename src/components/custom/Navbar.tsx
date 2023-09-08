import { BookOpen } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chapters, pageType } from "@/lib/constants";

export default function Navbar() {
  return (
    <Sheet>
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white py-4">
        <Link href="/">
          <h1 className="text-xl md:text-2xl">DynamoDB</h1>
        </Link>

        <SheetTrigger asChild>
          <BookOpen size={32} strokeWidth={1} className="cursor-pointer" />
        </SheetTrigger>
      </nav>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="underline">Chapters</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full">
          <div className="my-4 flex flex-col">
            {chapters.map((chapter) => {
              return (
                <SheetClose asChild key={chapter.id}>
                  <Link href={chapter.href}>
                    <p
                      className={
                        chapter.type === pageType.chapter
                          ? "mt-4 font-semibold"
                          : "mt-1 pl-4"
                      }
                    >
                      {chapter.title}
                    </p>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
