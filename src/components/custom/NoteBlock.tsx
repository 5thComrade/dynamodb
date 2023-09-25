import Link from "next/link";
import { HelpCircle } from "lucide-react";

const NoteBlock = () => {
  return (
    <div className="my-4 flex items-center gap-4 rounded-md border border-black bg-yellow-100 p-4">
      <HelpCircle />
      <p className="text-lg">
        For interactivity with database, please complete the steps in{" "}
        <Link href="/requirements">
          <span className="text-blue-500">requirements</span>
        </Link>{" "}
        chapter.
      </p>
    </div>
  );
};

export default NoteBlock;
