import React, { createContext, useCallback, useEffect, useState } from "react";
import { AuthState, LoginCredentials } from "../types";
import * as appwriteAuth from "../services/appwriteAuth";
import { account } from "@/api";

interface AuthContextValue extends AuthState {
  loginAction: (credentials: LoginCredentials) => Promise<void>;
  logoutAction: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const loginAction = useCallback(async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const user = await appwriteAuth.login(credentials.email, credentials.password);
      setState({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await appwriteAuth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await account.get();
        setState({ user, isAuthenticated: true, isLoading: false });
      } catch {
        setState({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextValue = {
    ...state,
    loginAction,
    logoutAction: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
