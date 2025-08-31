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

import {
  MoreHorizontal,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  MapPin,
  Plus,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import api from "@/client/api-client";
import CreateInventoryDialog from "@/components/Dialog/Inventory/CreateInventory";
import { toast } from "sonner";
import DeleteInventoryAlert from "@/components/AlertDialog/DeleteInventory";
import EditInventoryDialog from "@/components/Dialog/Inventory/EditInventory";
import usePermission from "@/hooks/usePermission";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function InventoryPage() {
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasPermission = usePermission();

  const getInventoryStats = () => {
    const total = inventories.length;
    const inStock = inventories.filter((inv) => inv.status === "OK").length;
    const lowStock = inventories.filter((inv) => inv.status === "LOW").length;
    const outOfStock = inventories.filter(
      (inv) => inv.status === "OUT_OF_STOCK"
    ).length;
    const totalQuantity = inventories.reduce(
      (sum, inv) => sum + inv.quantity,
      0
    );
    const uniqueProducts = new Set(inventories.map((inv) => inv.product.id))
      .size;
    const uniqueLocations = new Set(inventories.map((inv) => inv.location.id))
      .size;

    return {
      total,
      inStock,
      lowStock,
      outOfStock,
      totalQuantity,
      uniqueProducts,
      uniqueLocations,
    };
  };

  const getStatusName = (status: string) => {
    const statusNames = {
      OK: "Em Estoque",
      LOW: "Baixo",
      OUT_OF_STOCK: "Fora de Estoque",
    };
    return statusNames[status as keyof typeof statusNames] || status;
  };

  const getStatusColor = (status: string) => {
    const statusColors = {
      OK: "bg-green-100 text-green-800 border-green-200",
      LOW: "bg-yellow-100 text-yellow-800 border-yellow-200",
      OUT_OF_STOCK: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      statusColors[status as keyof typeof statusColors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getStatusIcon = (status: string) => {
    const statusIcons = {
      OK: <CheckCircle className="w-4 h-4" />,
      LOW: <AlertTriangle className="w-4 h-4" />,
      OUT_OF_STOCK: <XCircle className="w-4 h-4" />,
    };
    return (
      statusIcons[status as keyof typeof statusIcons] || (
        <Package className="w-4 h-4" />
      )
    );
  };

  const columns = [
    {
      accessorKey: "productName",
      header: "Produto",
      accessorFn: (row: { product: { name: any } }) => row.product.name,
      cell: ({ row }: { row: { original: InventoryType } }) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">
              {row.original.product.name}
            </div>
            <div className="text-sm text-gray-500">
              {row.original.product.code}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "quantity",
      header: "Quantidade",
      cell: ({ row }: { row: { original: InventoryType } }) => (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {row.original.quantity}
          </div>
          <div className="text-sm text-gray-500">unidades</div>
        </div>
      ),
    },
    {
      accessorKey: "minStock",
      header: "Estoque Mínimo",
      cell: ({ row }: { row: { original: InventoryType } }) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {row.original.minStock}
          </div>
          <div className="text-xs text-gray-500">mínimo</div>
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Almoxarifado",
      accessorFn: (row: { location: { name: any } }) => row.location.name,
      cell: ({ row }: { row: { original: InventoryType } }) => (
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="font-medium text-gray-900">
            {row.original.location.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: { original: InventoryType } }) => (
        <div
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
            row.original.status
          )}`}
        >
          {getStatusIcon(row.original.status)}
          <span className="ml-2">{getStatusName(row.original.status)}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: InventoryType } }) => {
        const inventory = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                <span className="sr-only">Abrir menu</span>
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
        value: "OUT_OF_STOCK",
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
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const stats = getInventoryStats();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <TopBar />
        <>
          <div className="px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Gestão de Estoque
                  </h1>
                  <p className="text-lg text-gray-600">
                    Monitore e gerencie o estoque de todos os seus produtos
                  </p>
                </div>
                <CreateInventoryDialog
                  inventories={inventories}
                  setInventories={setInventories}
                >
                  <Button className="bg-[var(--primary-color)] hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
                    <Plus className="mr-2" size={20} />
                    Cadastrar Estoque
                  </Button>
                </CreateInventoryDialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Package className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total de Itens
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Em Estoque
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.inStock}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <AlertTriangle className="text-yellow-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Estoque Baixo
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.lowStock}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <XCircle className="text-red-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Sem Estoque
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.outOfStock}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <TrendingUp className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Quantidade Total
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalQuantity.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Package className="text-indigo-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Produtos Únicos
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.uniqueProducts}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <MapPin className="text-orange-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Almoxarifados
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.uniqueLocations}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!isLoading ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Lista de Estoque
                    </h2>
                    <p className="text-gray-600">
                      Gerencie todos os itens do seu estoque com filtros e ações
                      rápidas
                    </p>
                  </div>
                  <div className="p-6">
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
              ) : (
                <div className="bg-white rounded-xl p-12 text-center shadow-lg border border-gray-100">
                  <LoadingIndicator />
                </div>
              )}
            </div>
          </div>
        </>
      </div>
    </>
  );
}
