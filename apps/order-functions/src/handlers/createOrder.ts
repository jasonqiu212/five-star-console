import { Client, ID, TablesDB } from "node-appwrite";

export async function createOrder(context: any) {
  const { req, res } = context;

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT ?? "")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID ?? "");

  if (req.headers["x-appwrite-user-jwt"]) {
    client.setJWT(req.headers["x-appwrite-user-jwt"]);
  } else {
    return res.json({ success: false, error: "Unauthorized" }, 401);
  }

  const tablesDB = new TablesDB(client);

  const body = req.body ?? {};

  try {
    await tablesDB.createRow({
      databaseId: process.env.APPWRITE_DATABASE_ID ?? "",
      tableId: "product_type",
      rowId: ID.unique(),
      data: body,
    });
  } catch (e) {
    return res.json({ success: false, error: "Failed to create row" }, 500);
  }

  return res.json({ success: true });
}
