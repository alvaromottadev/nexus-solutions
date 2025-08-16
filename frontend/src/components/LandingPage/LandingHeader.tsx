import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logoNexus from "@/assets/logo_nexus.png";

interface LoginHeaderProps {
  scrollTo: (section: "about" | "advantages" | "contact") => void;
}

export default function LandingHeader({ scrollTo }: LoginHeaderProps) {
  const navigation = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogin() {
    navigation("/login");
  }

  function handleHome() {
    navigation("/home");
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="h-16 max-w-7xl mx-auto px-6">
          <div className="h-full hidden lg:flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img
                  src={logoNexus}
                  alt="Nexus Solutions Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold text-[var(--primary-color)]">
                Nexus Solutions
              </span>
            </div>

            <div className="flex items-center gap-8">
              <Button
                variant="ghost"
                onClick={() => scrollTo("advantages")}
                className="text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Vantagens
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollTo("about")}
                className="text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Sobre
              </Button>
              <Button
                variant="ghost"
                onClick={() => scrollTo("contact")}
                className="text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Contato
              </Button>
              <Button
                variant="ghost"
                onClick={handleHome}
                className="text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50 font-medium transition-all duration-200"
              >
                Home
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogin}
                variant="outline"
                className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 font-medium"
              >
                Entrar
              </Button>
              <Button
                onClick={handleLogin}
                className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Começar Agora
              </Button>
            </div>
          </div>

          <div className="h-full lg:hidden flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img
                  src={logoNexus}
                  alt="Nexus Solutions Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-[var(--primary-color)]">
                Nexus
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-6 py-4 space-y-3">
              <Button
                variant="ghost"
                onClick={() => {
                  scrollTo("advantages");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50"
              >
                Vantagens
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  scrollTo("about");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50"
              >
                Sobre
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  scrollTo("contact");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50"
              >
                Contato
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  handleHome();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full justify-start text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50"
              >
                Home
              </Button>
              <div className="pt-3 border-t border-gray-100 space-y-3">
                <Button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full border-[var(--primary-color)] text-[var(--primary-color)]"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white"
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
