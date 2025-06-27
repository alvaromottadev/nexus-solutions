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
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, User } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";

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
              <DropdownMenuItem>
                <Eye />
                Ver detalhes
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User />
                Ver usuário responsável{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

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
      <CreateMovementDialog />
      <div className="flex flex-1 flex-col items-center w-full">
        <CustomText className="text-[var(--primary-color)] text-[2.5rem] font-bold">
          Movimentações
        </CustomText>
        <div className="flex flex-1 items-center justify-center w-full">
          <div className="w-full max-w-[70%]">
            <DataTable
              columns={columns}
              data={movements}
              filters={true}
              filter={[
                {
                  type: "input",
                  placeholder: "Filtrar por tipo",
                  columnName: "type",
                },
                {
                  type: "input",
                  placeholder: "Filtrar por movimentador",
                  columnName: "perfomedByName",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
