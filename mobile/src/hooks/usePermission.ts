import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

export default function usePermission() {
  const { user } = useContext(AuthContext);
  const hasPermission =
    (user && user.type === 'COMPANY') ||
    (user && user.role.toLowerCase() === 'manager');
  return hasPermission;
}
