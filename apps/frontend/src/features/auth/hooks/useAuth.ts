import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Hook to access authentication context
 * @returns Auth context with user, authentication state, and actions
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return {
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    isLoading: context.isLoading,
    loginAction: context.loginAction,
    logout: context.logout,
    refreshAccessToken: context.refreshAccessToken,
  };
};
