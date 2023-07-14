import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <p>Menu</p>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Menu description</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <h1>Hello from Menu</h1>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <p>Some link</p>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
