import { jwtDecode } from "jwt-decode";
import { User } from "../types";

interface JWTPayload {
  email: string;
  name: string;
  exp: number;
  iat: number;
}

/**
 * Decodes a JWT token and returns the payload
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Checks if a JWT token is expired
 * @param token - The JWT token to check
 * @returns true if expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) {
    return true;
  }

  // exp is in seconds, Date.now() is in milliseconds
  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

/**
 * Extracts user information from a JWT token
 * @param token - The JWT token to extract user info from
 * @returns User object or null if invalid
 */
export const getUserFromToken = (token: string): User | null => {
  const payload = decodeToken(token);
  if (!payload) {
    return null;
  }

  return {
    email: payload.email,
    name: payload.name,
  };
};

/**
 * Checks if a token is valid (exists, properly formatted, and not expired)
 * @param token - The JWT token to validate
 * @returns true if valid, false otherwise
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }

  const payload = decodeToken(token);
  if (!payload) {
    return false;
  }

  return !isTokenExpired(token);
};
