import {
  AlignJustify,
  Archive,
  Bot,
  ChartBar,
  Hammer,
  Package,
  PackageSearch,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import CustomText from "./CustomText";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function SideBar() {
  const navigation = useNavigate();

  function handleClick(page: string) {
    navigation(`/${page}`);
  }

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
          <AlignJustify color="black" size={40} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Navegação</SheetTitle>
            <SheetDescription>
              Selecione uma opção para navegar pelo sistema.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col items-center gap-y-5 p-4">
            <div>
              <Button
                onClick={() => handleClick("locations")}
                className="min-w-[10rem] max-w-[10rem] "
              >
                <Archive />
                <CustomText>Almoxarifados</CustomText>
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleClick("products")}
                className="min-w-[10rem] max-w-[10rem]"
              >
                <Hammer />
                <CustomText>Produtos</CustomText>
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleClick("inventories")}
                className="min-w-[10rem] max-w-[10rem] "
              >
                <PackageSearch />
                <CustomText>Estoque</CustomText>
              </Button>
            </div>
            <div>
              <Button className="min-w-[10rem] max-w-[10rem] ">
                <Package />
                <CustomText>Movimentações</CustomText>
              </Button>
            </div>
            <div>
              <Button className="min-w-[10rem] max-w-[10rem] ">
                <ChartBar />
                <CustomText>Relatórios</CustomText>
              </Button>
            </div>
            <div>
              <Button className="min-w-[10rem] max-w-[10rem] ">
                <Bot />
                <CustomText>Oraculo</CustomText>
              </Button>
            </div>
            <div>
              <Button className="min-w-[10rem] max-w-[10rem] ">
                <User />
                <CustomText>Perfil</CustomText>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
