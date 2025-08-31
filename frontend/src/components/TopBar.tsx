import { useNavigate, useLocation } from "react-router";
import SideBar from "./Sidebar";
import TopBarButton from "./TopBarButton";
import {
  Home,
  MapPin,
  Package,
  Archive,
  Activity,
  Bot,
  Users,
  User,
} from "lucide-react";
import logoNexus from "@/assets/logo_nexus.png";

interface TopBarProps {
  isOracle?: boolean;
  enableSideBar?: boolean;
}

export default function TopBar({ isOracle = false }: TopBarProps) {
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
    { path: "home", label: "Início", icon: Home },
    { path: "locations", label: "Almoxarifados", icon: MapPin },
    { path: "products", label: "Produtos", icon: Package },
    { path: "inventories", label: "Estoque", icon: Archive },
    { path: "movements", label: "Movimentações", icon: Activity },
    {
      path: "movements_tool",
      label: "Movimentações (Ferramenta)",
      icon: Activity,
    },
    { path: "oracle", label: "Oráculo", icon: Bot },
    { path: "employees", label: "Funcionários", icon: Users },
    { path: "profile", label: "Perfil", icon: User },
  ];

  return (
    <>
      <div
        className={`h-16 ${
          isOracle
            ? "bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900"
            : "bg-white shadow-lg border-b border-gray-100"
        }`}
      >
        <div className="h-full lg:hidden flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <SideBar />
          </div>

          <div className="flex-1 flex justify-center">
            <TopBarButton
              label="Nexus Solutions"
              onClick={() => handleClick("home")}
              className={`text-xl font-bold ${
                isOracle ? "text-white" : "text-[var(--primary-color)]"
              }`}
            />
          </div>

          <div
            className="w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[var(--primary-color)]/90 transition-colors duration-200"
            onClick={() => handleClick("profile")}
          >
            <User className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="h-full hidden lg:flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden">
              <img
                src={logoNexus}
                alt="Nexus Solutions Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <TopBarButton
              onClick={() => handleClick("home")}
              label="Nexus Solutions"
              isOracle={isOracle}
              className={`text-xl font-bold ${
                isOracle ? "text-white" : "text-[var(--primary-color)]"
              }`}
            />
          </div>

          <div className="flex items-center gap-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);

              return (
                <TopBarButton
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  label={item.label}
                  isOracle={isOracle}
                  isActive={active}
                  icon={<IconComponent className="w-4 h-4" />}
                />
              );
            })}
          </div>

          <div className="hidden 2xl:flex items-center gap-3">
            <div
              className={`px-4 py-2 rounded-lg ${
                isOracle
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-700"
              } text-sm font-medium`}
            >
              Bem-vindo!
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200 ${
                isOracle ? "bg-white/20" : "bg-[var(--primary-color)]"
              }`}
              onClick={() => handleClick("profile")}
            >
              <User
                className={`w-5 h-5 ${isOracle ? "text-white" : "text-white"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
