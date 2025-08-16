import api from "@/client/api-client";
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
import {
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Package,
  Calendar,
  User,
  MapPin,
  BarChart3,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SeeDetailsDialog from "@/components/Dialog/Movement/SeeDetails";
import LoadingIndicator from "@/components/LoadingIndicator";

export default function MovementPage() {
  const [movements, setMovements] = useState<MovementType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getMovementStats = () => {
    const total = movements.length;
    const inMovements = movements.filter((mov) => mov.type === "IN").length;
    const outMovements = movements.filter((mov) => mov.type === "OUT").length;
    const totalItems = movements.reduce(
      (sum, mov) =>
        sum + mov.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0
    );
    const uniqueProducts = new Set(
      movements.flatMap((mov) => mov.items.map((item) => item.product.id))
    ).size;
    const uniqueUsers = new Set(
      movements.map((mov) => mov.performedBy?.id).filter(Boolean)
    ).size;

    return {
      total,
      inMovements,
      outMovements,
      totalItems,
      uniqueProducts,
      uniqueUsers,
    };
  };

  const getTypeName = (type: string) => {
    const typeNames = {
      IN: "Entrada",
      OUT: "Saída",
    };
    return typeNames[type as keyof typeof typeNames] || type;
  };

  const getTypeColor = (type: string) => {
    const typeColors = {
      IN: "bg-green-100 text-green-800 border-green-200",
      OUT: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      typeColors[type as keyof typeof typeColors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      IN: <ArrowDownLeft className="w-4 h-4" />,
      OUT: <ArrowUpRight className="w-4 h-4" />,
    };
    return (
      typeIcons[type as keyof typeof typeIcons] || (
        <Package className="w-4 h-4" />
      )
    );
  };

  const columns = [
    {
      accessorKey: "type",
      header: "Tipo",
      cell: ({ getValue }: { getValue: () => any }) => {
        const type = getValue();
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
              type
            )}`}
          >
            {getTypeIcon(type)}
            <span className="ml-2">{getTypeName(type)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ getValue }: { getValue: () => any }) => {
        const description = getValue();
        return (
          <div className="max-w-xs">
            <span className="text-sm text-gray-900">
              {description || "Sem descrição"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: "Almoxarifado",
      cell: ({ getValue }: { getValue: () => any }) => {
        const location = getValue();
        return (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {location || "Desconhecido"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "movementDate",
      header: "Data",
      cell: ({ getValue }: { getValue: () => any }) => {
        const date = new Date(getValue());
        return (
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-900">
              {date.toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "items",
      header: "Produtos",
      cell: ({ getValue }: { getValue: () => any }) => {
        const items = getValue();
        return (
          <div className="space-y-1">
            {items.map(
              (item: {
                product: { name: string; id: string };
                quantity: number;
              }) => (
                <div
                  key={item.product.id}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Package className="w-3 h-3 text-gray-400" />
                  <span className="text-gray-900">{item.product.name}</span>
                  <span className="text-gray-500">-</span>
                  <span className="font-medium text-gray-900">
                    {item.quantity}
                  </span>
                </div>
              )
            )}
          </div>
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
        return (
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">
              {movement.performedBy
                ? movement.performedBy.name
                : "Desconhecido"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }: { row: { original: MovementType } }) => {
        const item = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <span className="sr-only">Abrir menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <SeeDetailsDialog movement={item}>
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer">
                  <Eye className="w-4 h-4" />
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
        label: "Entrada",
      },
      {
        value: "OUT",
        label: "Saída",
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
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const stats = getMovementStats();

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
                    Movimentações de Estoque
                  </h1>
                  <p className="text-lg text-gray-600">
                    Acompanhe todas as entradas e saídas do seu estoque
                  </p>
                </div>
                <CreateMovementDialog
                  movements={movements}
                  setMovements={setMovements}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart3 className="text-blue-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.total}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <ArrowDownLeft className="text-green-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Entradas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.inMovements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-red-100 rounded-lg">
                      <ArrowUpRight className="text-red-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Saídas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.outMovements}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Package className="text-purple-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Itens Movimentados
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalItems.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                      <User className="text-orange-600" size={24} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Usuários Ativos
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.uniqueUsers}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {!isLoading ? (
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Histórico de Movimentações
                    </h2>
                    <p className="text-gray-600">
                      Visualize e gerencie todas as movimentações com filtros e
                      ações rápidas
                    </p>
                  </div>
                  <div className="p-6">
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
