import React, { createContext, useCallback, useEffect, useState } from "react";
import { AuthState, LoginCredentials } from "../types";
import * as appwriteAuth from "../services/appwriteAuth";

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

  /**
   * Login action using Appwrite
   */
  const loginAction = useCallback(async (credentials: LoginCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const response = await appwriteAuth.login(credentials.email, credentials.password);

      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw new Error("Login failed");
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, []);

  /**
   * Logout action using Appwrite
   */
  const logout = useCallback(async () => {
    try {
      await appwriteAuth.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always reset state even if logout fails
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  /**
   * Initialize auth state by checking for active Appwrite session
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const response = await appwriteAuth.getCurrentUser();

      if (response.success && response.data) {
        setState({
          user: response.data,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
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
