import { useAuth } from "./useAuth";

export default function usePermission() {
  const auth = useAuth();
  const hasPermission =
    (auth?.user && auth.user.type === "COMPANY") ||
    (auth?.user && auth.user.role) === "MANAGER";

  return hasPermission;
}
