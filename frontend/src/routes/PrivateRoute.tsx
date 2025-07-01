import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

interface PrivateRouteProps {
  allowedTypes?: string[];
}

export default function PrivateRoute({ allowedTypes }: PrivateRouteProps) {
  const auth = useAuth();

  //   if (auth?.loading) return <p>Carregando...</p>;

  if (auth && !auth.loading) {
    if (!auth.user || !auth.token) {
      return <Navigate to="/login" />;
    }
  }

  if (allowedTypes && !allowedTypes.includes(auth!.user!.type!)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}
