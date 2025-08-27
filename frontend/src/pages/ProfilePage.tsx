import ProfileForm from "@/components/ProfilePage/ProfileForm";
import TopBar from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { User, Building2, Mail, MapPin, LogOut, Shield } from "lucide-react";
import ChangePasswordDialog from "@/components/Dialog/ChangePassword/ChangePassword";

export default function ProfilePage() {
  const auth = useAuth();

  const isCompany = auth?.user && auth.user.type === "COMPANY";

  function handleLogout() {
    auth?.logout();
    toast.success("Logout realizado com sucesso!");
  }

  if (!auth?.user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <TopBar />

        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Meu Perfil
              </h1>
              <p className="text-lg text-gray-600">
                Gerencie suas informações pessoais e configurações da conta
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-[var(--primary-color)] to-blue-600 px-6 py-8 text-white">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
                    {isCompany ? (
                      <Building2 size={48} className="text-white" />
                    ) : (
                      <User size={48} className="text-white" />
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {auth.user.name}
                    </h2>
                    <p className="text-lg text-white/90 mb-1">
                      {isCompany ? "Empresa" : "Funcionário"}
                    </p>
                    {auth.user.role && (
                      <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        <Shield className="w-4 h-4 mr-2" />
                        {auth.user.role === "MANAGER"
                          ? "Gerente"
                          : auth.user.role === "OPERATOR"
                          ? "Operador"
                          : auth.user.role === "VIEWER"
                          ? "Visualizador"
                          : auth.user.role}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                      Informações de Contato
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-gray-900 font-medium">
                            {auth.user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {auth.user.company && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Building2 className="w-5 h-5 mr-2 text-[var(--primary-color)]" />
                        Informações da Empresa
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Empresa</p>
                            <p className="text-gray-900 font-medium">
                              {auth.user.company.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">Endereço</p>
                            <p className="text-gray-900 font-medium">
                              {auth.user.company.address.street},{" "}
                              {auth.user.company.address.number}
                              {auth.user.company.address.complement &&
                                `, ${auth.user.company.address.complement}`}
                              <br />
                              {auth.user.company.address.district},{" "}
                              {auth.user.company.address.city} -{" "}
                              {auth.user.company.address.state}
                              <br />
                              {auth.user.company.address.postalCode},{" "}
                              {auth.user.company.address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {isCompany
                    ? "Editar Perfil da Empresa"
                    : "Editar Perfil do Funcionário"}
                </h3>
                <p className="text-gray-600">
                  Atualize suas informações pessoais e configurações
                </p>
              </div>
              <div className="p-6">
                <ProfileForm user={auth.user} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ações da Conta
                </h3>
                <p className="text-gray-600">Gerencie sua conta e sessão</p>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="flex items-center gap-2 px-6 py-3 transition-all duration-200 hover:scale-105"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair da Conta
                  </Button>
                  <ChangePasswordDialog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
