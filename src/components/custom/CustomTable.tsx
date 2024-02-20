import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  headers: string[];
  tableData: { [index: string]: string | number | boolean | object }[]; // index signature in TypeScript
};

export default function CustomTable({ headers, tableData }: Props) {
  return (
    <Table className="mt-4">
      <TableHeader>
        <TableRow className="bg-slate-300 hover:bg-slate-300">
          <TableHead colSpan={2} className="font-semibold text-black">
            Primary Key
          </TableHead>
          <TableHead
            colSpan={headers.length}
            className="font-semibold text-black"
          >
            Attributes
          </TableHead>
        </TableRow>
        <TableRow className="bg-slate-200 hover:bg-slate-200">
          {headers.map((item, index) => {
            return (
              <TableHead key={item} className="font-semibold text-black">
                {index === 0
                  ? `Partition key: ${item}`
                  : index === 1
                    ? `Sort key: ${item}`
                    : item}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item, index) => {
          return (
            <TableRow key={index}>
              {headers.map((i) => {
                if (typeof item?.[i] === "object") {
                  return (
                    <TableCell key={i}>{JSON.stringify(item?.[i])}</TableCell>
                  );
                } else {
                  return (
                    <TableCell key={i}>{JSON.stringify(item?.[i])}</TableCell>
                  );
                }
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
