import api from "@/client/api-client";
import type { AuthMeType } from "@/types/AuthMeType";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  user: AuthMeType | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    setToken(token);
    getUser(token);
  }, []);

  async function getUser(token: string) {
    api
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setToken(token);
        setLoading(false);
      });
  }

  function login(token: string) {
    localStorage.setItem("token", token);
    setToken(token);
    getUser(token);
    navigate("/home");
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
