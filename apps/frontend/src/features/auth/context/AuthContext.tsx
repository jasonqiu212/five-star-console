import React, { createContext, useCallback, useEffect, useState } from "react";
import { AuthState, LoginCredentials, User } from "../types";
import * as authApi from "../services/authApi";
import { getUserFromToken, isTokenValid } from "../utils/jwt";

interface AuthContextValue extends AuthState {
  loginAction: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
  USER: "auth_user",
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  /**
   * Save auth data to localStorage
   */
  const saveToStorage = useCallback((accessToken: string, refreshToken: string, user: User) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, []);

  /**
   * Clear auth data from localStorage
   */
  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  /**
   * Load auth data from localStorage
   */
  const loadFromStorage = useCallback((): {
    accessToken: string;
    refreshToken: string;
    user: User;
  } | null => {
    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);

    if (!accessToken || !refreshToken || !userStr) {
      return null;
    }

    try {
      const user = JSON.parse(userStr) as User;
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error("Failed to parse user from storage:", error);
      return null;
    }
  }, []);

  /**
   * Refresh the access token
   */
  const refreshAccessToken = useCallback(async () => {
    const storedRefreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

    if (!storedRefreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await authApi.refreshAccessToken(storedRefreshToken);
      const newAccessToken = response.accessToken;

      // Extract user from new token
      const user = getUserFromToken(newAccessToken);

      if (!user) {
        throw new Error("Invalid token received");
      }

      // Update storage with new access token
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      // Update state
      setState((prev) => ({
        ...prev,
        accessToken: newAccessToken,
        user,
        isAuthenticated: true,
      }));
    } catch (error) {
      console.error("Token refresh failed:", error);
      // If refresh fails, logout the user
      logout();
      throw error;
    }
  }, []);

  /**
   * Login action
   */
  const loginAction = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const response = await authApi.login(credentials);
        const { accessToken, refreshToken, user } = response;

        // Save to localStorage
        saveToStorage(accessToken, refreshToken, user);

        // Update state
        setState({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [saveToStorage]
  );

  /**
   * Logout action
   */
  const logout = useCallback(() => {
    // Optionally call backend logout endpoint
    const token = state.accessToken;
    if (token) {
      authApi.logout(token).catch((error) => {
        console.error("Backend logout failed:", error);
      });
    }

    // Clear storage
    clearStorage();

    // Reset state
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, [state.accessToken, clearStorage]);

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const stored = loadFromStorage();

      if (!stored) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const { accessToken, refreshToken: storedRefreshToken, user } = stored;

      // Check if access token is valid
      if (isTokenValid(accessToken)) {
        setState({
          user,
          accessToken,
          refreshToken: storedRefreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Try to refresh the token
        try {
          await refreshAccessToken();
          setState((prev) => ({ ...prev, isLoading: false }));
        } catch (error) {
          console.error("Failed to refresh token on mount:", error);
          clearStorage();
          setState({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      }
    };

    initializeAuth();
  }, [loadFromStorage, clearStorage, refreshAccessToken]);

  const value: AuthContextValue = {
    ...state,
    loginAction,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
