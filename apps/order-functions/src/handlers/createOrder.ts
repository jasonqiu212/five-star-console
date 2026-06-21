import { Client, ID, Query, TablesDB } from "node-appwrite";
import {
  InvoiceNumberSequence,
  InvoiceOrgEntity,
  InvoiceStatus,
  PoNumberSequence,
  ServerOrder,
} from "shared-types";

const TAX_RATE = 0.09;

function formatInvoiceNumber(entity: string, nextValue: number): string {
  const prefix = entity === InvoiceOrgEntity.LeatherAndStitch ? "LS-" : "FS-";
  return prefix + String(nextValue);
}

export async function createOrder(context: any) {
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
  const body: Omit<ServerOrder, "$id"> = req.body ?? {};
  const items = body.items ?? [];

  try {
    // Increment PO number sequence and get current value
    const poSeqResult = await tablesDB.listRows<PoNumberSequence>({
      databaseId,
      tableId: "po_number_sequence",
      queries: [Query.limit(1)],
    });
    const poSeqRow = poSeqResult.rows[0];
    const poNumber = poSeqRow.nextValue;
    await tablesDB.updateRow({
      databaseId,
      tableId: "po_number_sequence",
      rowId: poSeqRow.$id,
      data: { nextValue: poNumber + 1 },
    });

    // Create the order
    const order = await tablesDB.createRow({
      databaseId,
      tableId: "order",
      rowId: ID.unique(),
      data: {
        orderDate: body.orderDate,
        poNumber: String(poNumber),
        client: body.client,
        clientDetails: body.clientDetails,
        carBrand: body.carBrand,
        carModel: body.carModel,
        carPlate: body.carPlate,
        handoverDate: body.handoverDate,
      },
    });

    // Create order items in parallel
    await Promise.all(
      items.map((item) =>
        tablesDB.createRow({
          databaseId,
          tableId: "order_item",
          rowId: ID.unique(),
          data: {
            productType: item.productType,
            leatherType: item.leatherType,
            seatReplacementScope: item.seatReplacementScope,
            partialSetDetails: item.partialSetDetails,
            color: item.color,
            thread: item.thread,
            details: item.description,
            order: order.$id,
          },
        })
      )
    );

    if (body.createInvoice && body.invoiceEntity) {
      // Increment invoice number sequence and get current value
      const invoiceSeqResult = await tablesDB.listRows<InvoiceNumberSequence>({
        databaseId,
        tableId: "invoice_number_sequence",
        queries: [Query.limit(10)],
      });
      const invoiceSeqRow = invoiceSeqResult.rows.find((r) => r.entity === body.invoiceEntity);
      if (!invoiceSeqRow) {
        return res.json({ error: "Invoice number sequence not found" }, 500);
      }
      const invoiceNumber = invoiceSeqRow.nextValue;
      await tablesDB.updateRow({
        databaseId,
        tableId: "invoice_number_sequence",
        rowId: invoiceSeqRow.$id,
        data: { nextValue: invoiceNumber + 1 },
      });

      // Calculate totals
      const subtotalExclTax = items.reduce(
        (sum, item) => sum + (item.unitPrice ?? 0) * (item.quantity ?? 1),
        0
      );
      const totalTax = subtotalExclTax * TAX_RATE;
      const totalInclTax = subtotalExclTax + totalTax;

      // Create the invoice
      const invoice = await tablesDB.createRow({
        databaseId,
        tableId: "invoice",
        rowId: ID.unique(),
        data: {
          invoiceNumber: formatInvoiceNumber(body.invoiceEntity, invoiceNumber),
          taxRate: TAX_RATE,
          subtotalExclTax,
          totalTax,
          totalInclTax,
          billingComments: body.billingComments,
          openDate: body.orderDate,
          status: InvoiceStatus.OPEN,
          client: body.client,
          clientDetails: body.clientDetails,
          carBrand: body.carBrand,
          carModel: body.carModel,
          carPlate: body.carPlate,
          order: order.$id,
        },
      });

      // Create invoice items in parallel
      await Promise.all(
        items.map((item) =>
          tablesDB.createRow({
            databaseId,
            tableId: "invoice_item",
            rowId: ID.unique(),
            data: {
              title: [item.productType, item.description].filter(Boolean).join(" - "),
              unitPriceExclTax: item.unitPrice ?? 0,
              invoice: invoice.$id,
            },
          })
        )
      );
    }

    return res.json({ orderId: order.$id });
  } catch (_e) {
    return res.json({ error: "Failed to create order" }, 500);
  }
}
