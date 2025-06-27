import api from "@/client/api-client";
import DataTable from "@/components/DataTable";
import DatePickerComponent from "@/components/DatePicker";
import Required from "@/components/Required";
import SelectComponent from "@/components/SelectComponent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { LocationType } from "@/types/LocationType";
import { DialogClose } from "@radix-ui/react-dialog";
import { MoreHorizontal, Plus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import AddProductDialog from "./AddProduct";
import type ProductWithQuantityType from "@/types/ProductWithQuantityType";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CreateMovementDialog() {
  const form = useForm();

  const [open, setOpen] = useState<boolean>(false);

  const [productsSelected, setProductsSelected] = useState<
    ProductWithQuantityType[]
  >([]);

  const [type, setType] = useState<string>("");
  const [locations, setLocations] = useState<LocationType[]>([]);

  const [typeError, setTypeError] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false);
  const [productError, setProductError] = useState<boolean>(false);

  const [locationId, setLocationId] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [description, setDescription] = useState<string | null>(null);

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
      {
        id: "actions",
        cell: ({ row }: { row: { original: ProductWithQuantityType } }) => {
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
                <DropdownMenuItem onClick={() => handleRemoveProduct(item)}>
                  <X />
                  Remover produto
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const movementsTypes = [
    {
      id: "IN",
      name: "IN",
    },
    {
      id: "OUT",
      name: "OUT",
    },
  ];

  useEffect(() => {
    api
      .get(`/locations`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setLocations(res.data.content);
      });
  }, []);

  function handleRemoveProduct(item: ProductWithQuantityType) {
    setProductsSelected((prev) =>
      prev.filter((product) => product.product.id !== item.product.id)
    );
    toast.success("Produto removido com sucesso!", {
      description: `Produto: ${item.product.name}`,
      duration: 1000,
    });
  }

  function handleChangeDate(date: Date | undefined) {
    setDateError(false);
    setDate(date);
  }

  async function handleRegister() {
    const isValid = validateForm();
    if (!isValid) return;

    const body = {
      type,
      description,
      locationId: locationId,
      movementDate: date?.toISOString(),
      items: productsSelected.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    api
      .post(`/movements`, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        toast.success("Movimentação registrada com sucesso!", {
          duration: 2000,
        });
      });
    setOpen(false);
  }

  function validateForm() {
    if (!type) {
      setTypeError(true);
      return false;
    }
    if (!date) {
      setDateError(true);
      return false;
    }
    if (!locationId) {
      setLocationError(true);
      return false;
    }
    if (productsSelected.length === 0) {
      setProductError(true);
      toast.error("Selecione pelo menos um produto para a movimentação.", {
        duration: 2000,
      });
      return false;
    }
    return true;
  }

  return (
    <>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="fixed right-5 bottom-5 flex items-center justify-center bg-[var(--primary-color)] rounded-full">
              <Button className="w-[4rem] h-[4rem] bg-var(--primary-color) rounded-full cursor-pointer">
                <Plus color="white" />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-auto">
            <DialogHeader>
              <DialogTitle>Registrar Movimentação</DialogTitle>
              <DialogDescription>
                Aqui você pode registrar uma nova movimentação de estoque.
                Selecione o tipo de movimentação, o produto e a quantidade.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <div className="flex flex-col gap-y-5">
                <div className="flex gap-x-5">
                  <FormField
                    control={form.control}
                    name="type"
                    render={() => (
                      <FormItem>
                        <FormLabel
                          className={`${typeError ? "text-red-500" : ""}`}
                        >
                          Tipo de Movimentação <Required />
                        </FormLabel>
                        <FormControl>
                          <SelectComponent
                            data={movementsTypes}
                            isError={typeError}
                            placeholder="Selecione o tipo de movimentação..."
                            onChange={setType}
                            setError={setTypeError}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel
                          className={`${dateError ? "text-red-500" : ""}`}
                        >
                          Data da movimentação <Required />
                        </FormLabel>
                        <FormControl>
                          <DatePickerComponent
                            date={date}
                            onChange={handleChangeDate}
                            isError={dateError}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={() => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          className="font-poppins placeholder:font-poppins"
                          placeholder="Ex.: Entrada de novos produtos no estoque"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </FormControl>
                      <FormDescription>
                        Descreva brevemente o motivo ou detalhes da
                        movimentação.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={() => (
                    <FormItem>
                      <FormLabel
                        className={`${locationError ? "text-red-500" : ""}`}
                      >
                        Almoxarifado <Required />
                      </FormLabel>
                      <FormControl>
                        <SelectComponent
                          data={locations}
                          placeholder="Selecione um almoxarifado..."
                          label="Almoxarifado"
                          onChange={setLocationId}
                          isError={locationError}
                          setError={setLocationError}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <AddProductDialog
                  productsSelected={productsSelected}
                  setProductsSelected={setProductsSelected}
                />
              </div>
            </Form>
            <DataTable
              filters={false}
              data={productsSelected}
              columns={columns}
              pageSize={5}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button className="bg-transparent text-red-500 border-red-500 border-[1px] shadow-none hover:bg-red-500 hover:text-white cursor-pointer">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={handleRegister}
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)] cursor-pointer"
              >
                Registrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
