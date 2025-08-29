import api from "@/client/api-client";
import DataTable from "@/components/DataTable";
import TopBar from "@/components/TopBar";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Package,
  Calendar,
  BarChart3,
  Barcode,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import type { MovementToolType } from "@/types/MovementToolType";
import SearchComponentTool from "@/components/SearchComponentTool";
import { toast } from "sonner";

export default function MovementToolPage() {
  const [movements, setMovements] = useState<MovementToolType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [barCode, setBarCode] = useState<string>("");
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const getMovementStats = () => {
    const total = movements.length;
    const inMovements = movements.filter(
      (mov) => mov.status === "ENTRY"
    ).length;
    const outMovements = movements.filter(
      (mov) => mov.status === "EXIT"
    ).length;

    return {
      total,
      inMovements,
      outMovements,
    };
  };

  const getTypeName = (type: string) => {
    const typeNames = {
      ENTRY: "Entrada",
      EXIT: "Saída",
    };
    return typeNames[type as keyof typeof typeNames] || type;
  };

  const getTypeColor = (type: string) => {
    const typeColors = {
      ENTRY: "bg-green-100 text-green-800 border-green-200",
      EXIT: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      typeColors[type as keyof typeof typeColors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  const getTypeIcon = (type: string) => {
    const typeIcons = {
      ENTRY: <ArrowDownLeft className="w-4 h-4" />,
      EXIT: <ArrowUpRight className="w-4 h-4" />,
    };
    return (
      typeIcons[type as keyof typeof typeIcons] || (
        <Package className="w-4 h-4" />
      )
    );
  };

  const columns = [
    {
      accessorKey: "status",
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
      accessorKey: "movementedAt",
      header: "Data e Hora",
      cell: ({ getValue }: { getValue: () => any }) => {
        const date = new Date(getValue());
        return (
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-900">
              {new Date(
                date.getTime() - date.getTimezoneOffset() * 60000
              ).toLocaleDateString("pt-BR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "product",
      header: "Ferramenta",
      cell: ({ getValue }: { getValue: () => any }) => {
        const product = getValue();
        return (
          <div className="space-y-1">
            <div
              key={product.id}
              className="flex items-center space-x-2 text-sm"
            >
              <Package className="w-3 h-3 text-gray-400" />
              <span className="text-gray-900">{product.name}</span>
            </div>
          </div>
        );
      },
    },
  ];

  const types = useMemo(
    () => [
      {
        value: "ENTRY",
        label: "Entrada",
      },
      {
        value: "EXIT",
        label: "Saída",
      },
    ],
    []
  );

  useEffect(() => {
    api
      .get(`/tools`, {
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

  useEffect(() => {
    handleSearch();
  }, [barCode]);

  const stats = getMovementStats();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleSearch() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (barCode.length > 2) {
        console.log(`Lemos o código: ${barCode}`);
        handleBarCode();
      }
    }, 500);
  }

  function handleBarCode() {
    setInputDisabled(true);
    api
      .post(
        `/tools/${barCode}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const status = res.data.status === "ENTRY" ? "entrada" : "saída";
        const productName = res.data.product.name;
        toast.success(`Movimentação registrada: ${status} - ${productName}`);
        const response = res.data as MovementToolType;
        setMovements((prev) => [response, ...prev]);
        setBarCode("");
        setInputDisabled(false);
        inputRef.current?.focus();
      })
      .catch(() => {
        setInputDisabled(false);
        inputRef.current?.focus();
      });
  }

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
                    Movimentações de Ferramentas e Equipamentos
                  </h1>
                  <p className="text-lg text-gray-600">
                    Acompanhe todas as entradas e saídas de suas
                    Ferramentas/Equipamentos
                  </p>
                </div>
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
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-4 lg:mb-0">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                      <Barcode className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                      Código de Barras
                    </h2>
                    <p className="text-gray-600">
                      Leia o código de barras da ferramenta para registrar a
                      movimentação (entrada/saída)
                    </p>
                  </div>
                  <div className="flex-1 lg:ml-8">
                    <SearchComponentTool
                      ref={inputRef}
                      placeholder="Digite o código de barra..."
                      handleSearch={handleSearch}
                      setValue={setBarCode}
                      value={barCode}
                      inputDisabled={inputDisabled}
                    />
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
                          columnName: "status",
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
