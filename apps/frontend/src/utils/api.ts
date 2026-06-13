import { message } from "antd";
import { AppwriteException, Models } from "appwrite";

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

export async function functionCall<T>(fn: () => Promise<Models.Execution>): Promise<T> {
  const execution = await apiCall(fn);
  if (execution.responseStatusCode !== 200) {
    const body = JSON.parse(execution.responseBody);
    const errorMessage = body.error ?? "Function call failed";
    message.error(errorMessage);
    throw new Error(errorMessage);
  }
  return JSON.parse(execution.responseBody) as T;
}
