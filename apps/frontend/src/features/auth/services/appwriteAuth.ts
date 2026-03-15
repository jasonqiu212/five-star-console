import { account } from "@/api";
import { Models } from "appwrite";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Login with email and password using Appwrite
 * @param email - User email
 * @param password - User password
 * @returns API response with user data
 */
export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<Models.User<Models.Preferences>>> => {
  try {
    // Create email session with Appwrite
    await account.createEmailPasswordSession({ email, password });

    // Get the current user data
    const user = await account.get();

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Login failed",
    };
  }
};

/**
 * Get the currently authenticated user
 * @returns API response with user data or null if not authenticated
 */
export const getCurrentUser = async (): Promise<
  ApiResponse<Models.User<Models.Preferences> | null>
> => {
  try {
    const user = await account.get();
    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    // User is not authenticated
    return {
      success: false,
      data: null,
      error: error.message || "Not authenticated",
    };
  }
};

/**
 * Logout the current user
 * Deletes the current session
 */
export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    await account.deleteSession({ sessionId: "current" });
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Logout failed",
    };
  }
};

/**
 * Check if there's an active session
 * @returns True if user has an active session
 */
export const checkSession = async (): Promise<boolean> => {
  try {
    await account.getSession({ sessionId: "current" });
    return true;
  } catch {
    return false;
  }
};
