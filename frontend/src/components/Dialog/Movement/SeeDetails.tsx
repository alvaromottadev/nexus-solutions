import type { MovementType } from "@/types/MovementType";
import type React from "react";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import CustomText from "@/components/CustomText";
import DataTable from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo, useState } from "react";
import type ProductWithQuantityType from "@/types/ProductWithQuantityType";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface SeeDetailsDialogProps {
  movement: MovementType;
  children: React.ReactNode;
}

export default function SeeDetailsDialog({
  movement,
  children,
}: SeeDetailsDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const date = new Date(movement.movementDate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const columns = useMemo<any[]>(
    () => [
      {
        accessorKey: "name",
        header: "Produto",
        accessorFn: (row: { product: { name: any } }) => row.product.name,
      },
      {
        accessorKey: "quantity",
        header: "Quantidade",
      },
    ],
    []
  );

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes da Movimentação</DialogTitle>
            <DialogDescription>
              Veja abaixo os detalhes completos desta movimentação, incluindo
              informações como data, tipo e descrição.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-x-2">
            <CustomText>Tipo:</CustomText>
            <CustomText
              className={
                movement.type === "IN" ? "text-green-500" : "text-red-500"
              }
            >
              {movement.type}
            </CustomText>
          </div>
          <div className="flex flex-col gap-x-2">
            <CustomText>Descrição:</CustomText>
            <CustomText>
              {movement.description ? movement.description : "Sem descrição"}
            </CustomText>
          </div>
          <div className="flex gap-x-2">
            <CustomText>Data:</CustomText>
            <CustomText>{date}</CustomText>
          </div>
          <div>
            <CustomText>
              Movimentado por: {movement.performedBy.name}
            </CustomText>
          </div>
          <div>
            <CustomText>Produtos</CustomText>
            <DataTable columns={columns} data={movement.items} pageSize={5} />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
