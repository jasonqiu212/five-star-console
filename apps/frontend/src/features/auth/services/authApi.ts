import { LoginCredentials, LoginResponse, RefreshTokenResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Login with email and password
 * @param credentials - User login credentials
 * @returns Login response with tokens and user info
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Login failed" }));
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

/**
 * Refresh the access token using a refresh token
 * @param refreshToken - The refresh token
 * @returns New access token
 */
export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Token refresh failed" }));
    throw new Error(error.message || "Token refresh failed");
  }

  return response.json();
};

/**
 * Logout (optional - can be used if backend implements logout endpoint)
 * @param token - The access token
 */
export const logout = async (token: string): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Logout failure is not critical, we'll clear local state anyway
    console.error("Logout request failed:", error);
  }
};
