import DataTable from "@/components/DataTable";
import type InventoryType from "@/types/InventoryType";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import CustomText from "@/components/CustomText";
import api from "@/client/api-client";
import CreateInventoryDialog from "@/components/Dialog/Inventory/CreateInventory";
import type { ProductType } from "@/types/ProductType";
import type { LocationType } from "@/types/LocationType";

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
            <DropdownMenuItem>
              <Edit />
              Editar estoque
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Delete stock")}>
              <Trash />
              Apagar Estoque
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function InventoryPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [location, setLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    api
      .get(`/inventories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setInventories(res.data);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <TopBar />
        <CreateInventoryDialog />
        <div className="flex justify-center">
          <CustomText className="text-[var(--primary-color)] text-[2.5rem] font-bold">
            Gestão de Estoque
          </CustomText>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[80%]">
            <DataTable data={inventories} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
