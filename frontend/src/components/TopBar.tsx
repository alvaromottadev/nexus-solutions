import { useNavigate } from "react-router";
import SideBar from "./Sidebar";
import TopBarButton from "./TopBarButton";

interface TopBarProps {
  isOracle?: boolean;
  enableSideBar?: boolean;
}

export default function TopBar({ isOracle = false }: TopBarProps) {
  const navigation = useNavigate();

  function handleClick(page: string) {
    navigation(`/${page}`);
  }

  return (
    <>
      <div className="h-[5rem] absolute md:relative">
        <div className="h-full lg:hidden flex items-center">
          <div className="ml-3 self-center z-1">
            <SideBar />
          </div>
          {/* <div className="absolute self-center flex justify-center items-center w-full">
            <TopBarButton
              label="Nexus Solutions"
              onClick={() => handleClick("home")}
              className="text-[2rem] md:text-[2.5rem] text-[var(--primary-color)]"
            />
          </div> */}
        </div>
        <div className=" h-full hidden lg:flex items-center justify-around">
          <TopBarButton
            onClick={() => handleClick("home")}
            label="Nexus Solutions"
            isOracle={isOracle}
            className={`text-[1.5rem] ${
              isOracle ? "text-white" : "text-[var(--primary-color)]"
            }`}
          />
          <TopBarButton
            onClick={() => handleClick("locations")}
            label="Almoxarifados"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("products")}
            label="Produtos"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("inventories")}
            label="Estoque"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("movements")}
            label="Movimentações"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("oracle")}
            label="Oraculo"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("employees")}
            label="Funcionários"
            isOracle={isOracle}
          />
          <TopBarButton
            onClick={() => handleClick("profile")}
            label="Perfil"
            isOracle={isOracle}
          />
        </div>
      </div>
    </>
  );
}
