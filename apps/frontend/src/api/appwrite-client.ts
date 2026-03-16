import { Client, Account, TablesDB } from "appwrite";

// Validate required environment variables
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  throw new Error(
    "Missing required Appwrite environment variables. " +
      "Please ensure VITE_APPWRITE_ENDPOINT and VITE_APPWRITE_PROJECT_ID are set in your .env file."
  );
}

const client = new Client().setEndpoint(endpoint).setProject(projectId);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
