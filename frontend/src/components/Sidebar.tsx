import {
  AlignJustify,
  Archive,
  Bot,
  Hammer,
  Package,
  PackageSearch,
  User,
  Home,
  MapPin,
  Activity,
  Users,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router";

export default function SideBar() {
  const navigation = useNavigate();
  const location = useLocation();

  function handleClick(page: string) {
    navigation(`/${page}`);
  }

  const isActive = (path: string) => {
    if (path === "home" && location.pathname === "/") return true;
    return location.pathname === `/${path}`;
  };

  const menuItems = [
    {
      path: "home",
      label: "Início",
      icon: Home,
      color: "from-blue-500 to-cyan-500",
    },
    {
      path: "locations",
      label: "Almoxarifados",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
    },
    {
      path: "products",
      label: "Produtos",
      icon: Hammer,
      color: "from-yellow-500 to-orange-500",
    },
    {
      path: "inventories",
      label: "Estoque",
      icon: Archive,
      color: "from-purple-500 to-pink-500",
    },
    {
      path: "movements",
      label: "Movimentações",
      icon: Activity,
      color: "from-indigo-500 to-blue-500",
    },
    {
      path: "oracle",
      label: "Oráculo",
      icon: Bot,
      color: "from-violet-500 to-purple-500",
    },
    {
      path: "employees",
      label: "Funcionários",
      icon: Users,
      color: "from-rose-500 to-pink-500",
    },
    {
      path: "profile",
      label: "Perfil",
      icon: User,
      color: "from-gray-500 to-slate-500",
    },
  ];

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
          <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center hover:bg-[var(--primary-color)]/90 transition-colors duration-200">
            <AlignJustify className="w-5 h-5 text-white" />
          </div>
        </SheetTrigger>
        <SheetContent className="w-80 bg-gradient-to-br from-gray-50 to-white border-l border-gray-200">
          <SheetHeader className="pb-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-[var(--primary-color)]">
                Nexus Solutions
              </SheetTitle>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <X className="w-4 h-4" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetDescription className="text-gray-600 mt-2">
              Navegue pelo sistema de gestão de almoxarifado
            </SheetDescription>
          </SheetHeader>

          <div className="py-6 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);

              return (
                <Button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  variant="ghost"
                  className={`
                    w-full justify-start h-14 px-4 rounded-xl transition-all duration-200
                    ${
                      active
                        ? "bg-[var(--primary-color)] text-white shadow-lg"
                        : "hover:bg-gray-100 text-gray-700 hover:text-[var(--primary-color)]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${
                        active
                          ? "bg-white/20"
                          : `bg-gradient-to-r ${item.color}`
                      }
                    `}
                    >
                      <IconComponent
                        className={`w-5 h-5 ${
                          active ? "text-white" : "text-white"
                        }`}
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>

                    {active && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-[var(--primary-color)]/10 to-[var(--primary-color)]/5 border border-[var(--primary-color)]/20 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--primary-color)]">
                    Sistema Ativo
                  </p>
                  <p className="text-xs text-gray-500">
                    Todas as funcionalidades disponíveis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
