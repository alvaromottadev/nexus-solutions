import api from "@/client/api-client";
import CustomText from "@/components/CustomText";
import DataTable from "@/components/DataTable";
import CreateMovementDialog from "@/components/Dialog/Movement/CreateMovement";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import type { MovementType } from "@/types/MovementType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SeeDetailsDialog from "@/components/Dialog/Movement/SeeDetails";

export default function MovementPage() {
  const [movements, setMovements] = useState<MovementType[]>([]);

  const columns = [
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }: { getValue: () => any }) =>
        getValue() ?? "Sem descrição",
    },
    {
      accessorKey: "movementDate",
      header: "Data",
      cell: ({ getValue }: { getValue: () => any }) => {
        const date = new Date(getValue());
        return date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      accessorKey: "items",
      header: "Produtos",
      cell: ({ getValue }: { getValue: () => any }) => {
        const items = getValue();
        return items.map(
          (item: { product: { name: string }; quantity: number }) => (
            <div key={item.product.name}>
              {item.product.name} - {item.quantity}
            </div>
          )
        );
      },
    },
    {
      accessorKey: "perfomedByName",
      header: "Realizado por",
      cell: ({
        row,
      }: {
        row: import("@tanstack/react-table").Row<MovementType>;
      }) => {
        const movement = row.original;
        return movement.performedBy
          ? movement.performedBy.name
          : "Desconhecido";
      },
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: MovementType } }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <SeeDetailsDialog movement={item}>
                <div
                  className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
          hover:bg-gray-100"
                >
                  <Eye />
                  Ver detalhes
                </div>
              </SeeDetailsDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const types = useMemo(
    () => [
      {
        value: "IN",
        label: "IN",
      },
      {
        value: "OUT",
        label: "OUT",
      },
    ],
    []
  );

  useEffect(() => {
    api
      .get(`/movements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setMovements(res.data);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <CreateMovementDialog movements={movements} setMovements={setMovements} />
      <div className="flex flex-1 flex-col items-center w-full">
        <CustomText className="text-[var(--primary-color)] text-[2rem] md:text-[2.5rem] font-bold">
          Movimentações
        </CustomText>
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-[90%] md:max-w-[80%]">
            <DataTable
              columns={columns}
              data={movements}
              filters={true}
              filter={[
                {
                  type: "select",
                  label: "tipo",
                  columnName: "type",
                  data: types,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
