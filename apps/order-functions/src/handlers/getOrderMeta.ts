import { Client, Query, TablesDB } from "node-appwrite";

export async function getOrderMeta(context: any) {
  const { req, res } = context;

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT ?? "")
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID ?? "");

  if (req.headers["x-appwrite-user-jwt"]) {
    client.setJWT(req.headers["x-appwrite-user-jwt"]);
  } else {
    return res.json({ error: "Unauthorized" }, 401);
  }

  const tablesDB = new TablesDB(client);
  const databaseId = process.env.APPWRITE_DATABASE_ID ?? "";

  try {
    const [clientsResult, productTypesResult] = await Promise.all([
      tablesDB.listRows({ databaseId, tableId: "client", queries: [Query.limit(1000)] }),
      tablesDB.listRows({ databaseId, tableId: "product_type", queries: [Query.limit(1000)] }),
    ]);

    return res.json({
      clients: clientsResult.rows,
      productTypes: productTypesResult.rows,
    });
  } catch (_e) {
    return res.json({ error: "Failed to fetch order meta" }, 500);
  }
}
