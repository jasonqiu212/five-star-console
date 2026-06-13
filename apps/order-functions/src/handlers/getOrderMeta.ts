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

  const t = () => Date.now();
  const elapsed = (start: number) => `${Date.now() - start}ms`;

  try {
    const totalStart = t();
    context.log("[getOrderMeta] starting parallel queries");

    const timed = <T>(label: string, promise: Promise<T>): Promise<T> => {
      const start = t();
      return promise.then(
        (r) => { context.log(`[getOrderMeta] ${label} done in ${elapsed(start)}`); return r; },
        (e) => { context.log(`[getOrderMeta] ${label} failed after ${elapsed(start)}: ${e}`); return Promise.reject(e); }
      );
    };

    const clientsResult = await timed("client", tablesDB.listRows<ClientType>({
      databaseId,
      tableId: "client",
      queries: [Query.limit(1000)],
    }));
    const productTypesResult = await timed("product_type", tablesDB.listRows<ProductType>({
      databaseId,
      tableId: "product_type",
      queries: [Query.limit(1000)],
    }));
    const invoiceSeqResult = await timed("invoice_number_sequence", tablesDB.listRows<InvoiceNumberSequence>({
      databaseId,
      tableId: "invoice_number_sequence",
      queries: [Query.limit(10)],
    }));
    const poSeqResult = await timed("po_number_sequence", tablesDB.listRows<PoNumberSequence>({
      databaseId,
      tableId: "po_number_sequence",
      queries: [Query.limit(1)],
    }));
    const carBrandsResult = await timed("car_brand", tablesDB.listRows<CarBrand>({
      databaseId,
      tableId: "car_brand",
      queries: [Query.select(["*", "carModels.*"]), Query.limit(1000)],
    }));

    context.log(`[getOrderMeta] all queries done in ${elapsed(totalStart)}`);

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
