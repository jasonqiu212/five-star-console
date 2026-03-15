import { message } from "antd";
import { AppwriteException } from "appwrite";

export async function apiCall<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof AppwriteException) {
      message.error(err.message);
    } else {
      message.error("An unknown error occurred. Please try again later.");
    }

    throw err;
  }
}
