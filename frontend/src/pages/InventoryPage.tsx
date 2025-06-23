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

const mockInventories: InventoryType[] = [
  {
    id: "12",
    quantity: 100,
    minStock: 10,
    status: "OK",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-02T00:00:00Z",
    product: {
      id: "p1",
      name: "Product 1",
      description: "Description of Product 1",
      image: "https://example.com/image1.jpg",
      qrCode: "https://example.com/qrcode1.png",
      code: "P001",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-02T00:00:00Z",
    },
  },
  {
    id: "2",
    quantity: 50,
    minStock: 5,
    status: "LOW",
    createdAt: "2023-01-03T00:00:00Z",
    updatedAt: "2023-01-04T00:00:00Z",
    product: {
      id: "p2",
      name: "Product 2",
      description: "Description of Product 2",
      image: "https://example.com/image2.jpg",
      qrCode: "https://example.com/qrcode2.png",
      code: "P002",
      createdAt: "2023-01-03T00:00:00Z",
      updatedAt: "2023-01-04T00:00:00Z",
    },
  },
  {
    id: "3",
    quantity: 0,
    minStock: 2,
    status: "OUT OF STOCK",
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-01-06T00:00:00Z",
    product: {
      id: "p3",
      name: "Product 3",
      description: "Description of Product 3",
      image: "https://example.com/image3.jpg",
      qrCode: "https://example.com/qrcode3.png",
      code: "P003",
      createdAt: "2023-01-05T00:00:00Z",
      updatedAt: "2023-01-06T00:00:00Z",
    },
  },
  {
    id: "4",
    quantity: 200,
    minStock: 20,
    status: "OK",
    createdAt: "2023-01-07T00:00:00Z",
    updatedAt: "2023-01-08T00:00:00Z",
    product: {
      id: "p4",
      name: "Product 4",
      description: "Description of Product 4",
      image: "https://example.com/image4.jpg",
      qrCode: "https://example.com/qrcode4.png",
      code: "P004",
      createdAt: "2023-01-07T00:00:00Z",
      updatedAt: "2023-01-08T00:00:00Z",
    },
  },
  {
    id: "5",
    quantity: 75,
    minStock: 10,
    status: "LOW",
    createdAt: "2023-01-09T00:00:00Z",
    updatedAt: "2023-01-10T00:00:00Z",
    product: {
      id: "p5",
      name: "Product 5",
      description: "Description of Product 5",
      image: "https://example.com/image5.jpg",
      qrCode: "https://example.com/qrcode5.png",
      code: "P005",
      createdAt: "2023-01-09T00:00:00Z",
      updatedAt: "2023-01-10T00:00:00Z",
    },
  },
  {
    id: "6",
    quantity: 30,
    minStock: 5,
    status: "OUT OF STOCK",
    createdAt: "2023-01-11T00:00:00Z",
    updatedAt: "2023-01-12T00:00:00Z",
    product: {
      id: "p6",
      name: "Product 6",
      description: "Description of Product 6",
      image: "https://example.com/image6.jpg",
      qrCode: "https://example.com/qrcode6.png",
      code: "P006",
      createdAt: "2023-01-11T00:00:00Z",
      updatedAt: "2023-01-12T00:00:00Z",
    },
  },
  {
    id: "7",
    quantity: 150,
    minStock: 15,
    status: "OK",
    createdAt: "2023-01-13T00:00:00Z",
    updatedAt: "2023-01-14T00:00:00Z",
    product: {
      id: "p7",
      name: "Product 7",
      description: "Description of Product 7",
      image: "https://example.com/image7.jpg",
      qrCode: "https://example.com/qrcode7.png",
      code: "P007",
      createdAt: "2023-01-13T00:00:00Z",
      updatedAt: "2023-01-14T00:00:00Z",
    },
  },
  {
    id: "8",
    quantity: 90,
    minStock: 10,
    status: "LOW",
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-01-16T00:00:00Z",
    product: {
      id: "p8",
      name: "Product 8",
      description: "Description of Product 8",
      image: "https://example.com/image8.jpg",
      qrCode: "https://example.com/qrcode8.png",
      code: "P008",
      createdAt: "2023-01-15T00:00:00Z",
      updatedAt: "2023-01-16T00:00:00Z",
    },
  },
  {
    id: "9",
    quantity: 120,
    minStock: 12,
    status: "OK",
    createdAt: "2023-01-17T00:00:00Z",
    updatedAt: "2023-01-18T00:00:00Z",
    product: {
      id: "p9",
      name: "Product 9",
      description: "Description of Product 9",
      image: "https://example.com/image9.jpg",
      qrCode: "https://example.com/qrcode9.png",
      code: "P009",
      createdAt: "2023-01-17T00:00:00Z",
      updatedAt: "2023-01-18T00:00:00Z",
    },
  },
  {
    id: "10",
    quantity: 60,
    minStock: 6,
    status: "OUT OF STOCK",
    createdAt: "2023-01-19T00:00:00Z",
    updatedAt: "2023-01-20T00:00:00Z",
    product: {
      id: "p10",
      name: "Product 10",
      description: "Description of Product 10",
      image: "https://example.com/image10.jpg",
      qrCode: "https://example.com/qrcode10.png",
      code: "P010",
      createdAt: "2023-01-19T00:00:00Z",
      updatedAt: "2023-01-20T00:00:00Z",
    },
  },
  {
    id: "10",
    quantity: 60,
    minStock: 6,
    status: "OUT OF STOCK",
    createdAt: "2023-01-19T00:00:00Z",
    updatedAt: "2023-01-20T00:00:00Z",
    product: {
      id: "p10",
      name: "Product 10",
      description: "Description of Product 10",
      image: "https://example.com/image10.jpg",
      qrCode: "https://example.com/qrcode10.png",
      code: "P010",
      createdAt: "2023-01-19T00:00:00Z",
      updatedAt: "2023-01-20T00:00:00Z",
    },
  },
];

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
      const payment = row.original;

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

  useEffect(() => {}, []);
  return (
    <>
      <div className="min-h-screen flex flex-col ">
        <TopBar />
        <div className="flex justify-center">
          <CustomText className="text-[var(--primary-color)] text-[2.5rem] font-bold">
            Gestão de Estoque
          </CustomText>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[80%]">
            <DataTable data={mockInventories} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}
