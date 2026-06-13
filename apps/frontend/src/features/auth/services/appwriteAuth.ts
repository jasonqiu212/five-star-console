import { account } from "@/api";
import { Models } from "appwrite";

export const login = async (
  email: string,
  password: string
): Promise<Models.User<Models.Preferences>> => {
  await account.createEmailPasswordSession({ email, password });
  return account.get();
};

export const logout = async (): Promise<void> => {
  await account.deleteSession({ sessionId: "current" });
};

export const createJwt = async (): Promise<string> => {
  const { jwt } = await account.createJWT();
  return jwt;
};
