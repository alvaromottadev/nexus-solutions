import { useNavigate } from "react-router";
import SideBar from "./Sidebar";
import TopBarButton from "./TopBarButton";

interface TopBarProps {
  isOracle?: boolean;
}

export default function TopBar({ isOracle = false }: TopBarProps) {
  const navigation = useNavigate();

  function handleClick(page: string) {
    navigation(`/${page}`);
  }

  return (
    <>
      <div className="h-[5rem]">
        <div className="h-full lg:hidden flex items-center">
          <div className="ml-3 self-center z-1">
            <SideBar />
          </div>
          <div className="absolute self-center flex justify-center items-center w-full">
            <label
              className={`font-poppins ${
                isOracle ? "text-white" : "text-[var(--color-gray)]"
              } text-[2.5rem]`}
            >
              Nexus Solutions
            </label>
          </div>
        </div>
        <div className=" h-full hidden lg:flex items-center justify-around">
          <TopBarButton
            onClick={handleClick}
            label="Nexus Solutions"
            url="home"
            isOracle={isOracle}
            className={`text-[1.5rem] ${
              isOracle ? "text-white" : "text-[var(--primary-color)]"
            }`}
          />
          <TopBarButton
            onClick={handleClick}
            label="Almoxarifados"
            url="locations"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Produtos"
            url="products"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Estoque"
            url="inventories"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Movimentações"
            url="movements"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Relatórios"
            url="reports"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Oraculo"
            url="oracle"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Funcionários"
            url="employees"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={handleClick}
            label="Perfil"
            url="profile"
            isOracle={isOracle}
          />
        </div>
      </div>
    </>
  );
}
