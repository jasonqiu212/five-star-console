import { Client, Query, TablesDB } from "node-appwrite";
import {
  CarBrand,
  Client as ClientType,
  GetOrderMetaResponse,
  InvoiceNumberSequence,
  InvoiceOrgEntity,
  PoNumberSequence,
  ProductType,
} from "shared-types";

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
    const clientsResult = await tablesDB.listRows<ClientType>({
      databaseId,
      tableId: "client",
      queries: [Query.limit(1000)],
    });
    const productTypesResult = await tablesDB.listRows<ProductType>({
      databaseId,
      tableId: "product_type",
      queries: [Query.limit(1000)],
    });
    const invoiceSeqResult = await tablesDB.listRows<InvoiceNumberSequence>({
      databaseId,
      tableId: "invoice_number_sequence",
      queries: [Query.limit(10)],
    });
    const poSeqResult = await tablesDB.listRows<PoNumberSequence>({
      databaseId,
      tableId: "po_number_sequence",
      queries: [Query.limit(1)],
    });
    const carBrandsResult = await tablesDB.listRows<CarBrand>({
      databaseId,
      tableId: "car_brand",
      queries: [Query.select(["*", "carModels.*"]), Query.limit(1000)],
    });

    const fiveStarSeq = invoiceSeqResult.rows.find(
      (r) => r.entity === InvoiceOrgEntity.FiveStarAutoLeather
    );
    const leatherSeq = invoiceSeqResult.rows.find(
      (r) => r.entity === InvoiceOrgEntity.LeatherAndStitch
    );

    const result: GetOrderMetaResponse = {
      clients: clientsResult.rows,
      productTypes: productTypesResult.rows,
      nextPoNumber: poSeqResult.rows[0]?.nextValue ?? 1,
      nextInvoiceNumbers: {
        fiveStarAutoLeather: fiveStarSeq?.nextValue ?? 1,
        leatherAndStitch: leatherSeq?.nextValue ?? 1,
      },
      carBrands: carBrandsResult.rows,
    };

    return res.json(result);
  } catch (_e) {
    return res.json({ error: "Failed to fetch order meta" }, 500);
  }
}
