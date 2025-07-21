import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import SelectComponentTwo from "./SelectComponentTwo";

interface DataTableProps<TData, TValue> {
  filter?: {
    type: "input" | "select";
    label: string;
    columnName: string;
    data?: {
      value: string;
      label: string;
    }[];
  }[];

  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: boolean;
  pageSize?: number;
}

export default function DataTable<TData, TValue>({
  filter,
  columns,
  data,
  filters = true,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });
  return (
    <div className="rounded-md border p-10  bg-[#f9f9f9] shadow-md">
      {filters && filter && (
        <div className="flex gap-x-2">
          {filter.map((filterItem) => {
            const type = filterItem.type;
            const columnName = filterItem.columnName;

            if (type === "input") {
              return (
                <div className="hidden md:block">
                  <Input
                    key={columnName}
                    placeholder={`Filtrar por ${filterItem.label}...`}
                    value={
                      (table
                        .getColumn(columnName)
                        ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn(columnName)
                        ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm bg-white"
                  />
                </div>
              );
            } else if (
              type === "select" &&
              filterItem.data &&
              filterItem.label
            ) {
              return (
                <SelectComponentTwo
                  label={filterItem.label}
                  data={filterItem.data}
                  key={columnName}
                  onChange={(value: string) =>
                    table.getColumn(columnName)?.setFilterValue(value)
                  }
                />
              );
            }
            return <></>;
          })}
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      cell.getContext().getValue() === "LOW"
                        ? "bg-red-100"
                        : cell.getContext().getValue() === "OUT OF STOCK"
                        ? "bg-red-500"
                        : cell.getContext().getValue() === "OK"
                        ? "bg-green-100"
                        : ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
