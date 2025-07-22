import DataTable from "@/components/DataTable";
import type InventoryType from "@/types/InventoryType";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import CustomText from "@/components/CustomText";
import api from "@/client/api-client";
import CreateInventoryDialog from "@/components/Dialog/Inventory/CreateInventory";
import { toast } from "sonner";
import DeleteInventoryAlert from "@/components/AlertDialog/DeleteInventory";
import EditInventoryDialog from "@/components/Dialog/Inventory/EditInventory";
import usePermission from "@/hooks/usePermission";

export default function InventoryPage() {
  const [inventories, setInventories] = useState<InventoryType[]>([]);

  const hasPermission = usePermission();

  const columns = [
    {
      accessorKey: "productName",
      header: "Produto",
      accessorFn: (row: { product: { name: any } }) => row.product.name,
      cell: ({ row }: { row: { original: InventoryType } }) =>
        row.original.product.name,
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
    },
    {
      accessorKey: "minStock",
      header: "Estoque Mínimo",
    },
    {
      accessorKey: "location",
      header: "Almoxarifado",
      accessorFn: (row: { location: { name: any } }) => row.location.name,
      cell: ({ row }: { row: { original: InventoryType } }) =>
        row.original.location.name,
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "actions",
      cell: ({ row }: { row: { original: InventoryType } }) => {
        const inventory = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <EditInventoryDialog
                inventories={inventories}
                inventory={inventory}
                setInventories={setInventories}
              />
              {hasPermission && (
                <DeleteInventoryAlert
                  inventoryId={inventory.id}
                  onDelete={handleDelete}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const status = useMemo(
    () => [
      {
        value: "OK",
        label: "Em Estoque",
      },
      {
        value: "LOW",
        label: "Baixo",
      },
      {
        value: "OUT OF STOCK",
        label: "Fora de Estoque",
      },
    ],
    []
  );

  async function handleDelete(inventoryId: string) {
    api
      .delete(`/inventories/${inventoryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setInventories(
          inventories.filter((inventory) => inventory.id !== inventoryId)
        );
        toast.success("Estoque deletado com sucesso!");
      });
  }

  useEffect(() => {
    api
      .get(`/inventories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setInventories(res.data);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <TopBar />
        <CreateInventoryDialog
          inventories={inventories}
          setInventories={setInventories}
        />
        <div className="flex justify-center">
          <CustomText className="mt-[2rem] text-[var(--primary-color)] text-[2rem] md:text-[2.5rem] font-bold">
            Gestão de Estoque
          </CustomText>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[90%] md:max-w-[80%]">
            <DataTable
              data={inventories}
              columns={columns}
              filters={true}
              filter={[
                {
                  type: "input",
                  columnName: "productName",
                  label: "produto",
                },
                {
                  type: "input",
                  columnName: "location",
                  label: "almoxarifado",
                },
                {
                  type: "select",
                  columnName: "status",
                  data: status,
                  label: "status",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
