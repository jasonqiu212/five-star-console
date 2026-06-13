import { createOrder } from "./handlers/createOrder.js";
import { getOrderMeta } from "./handlers/getOrderMeta.js";

export default async (context: any) => {
  const { method, path } = context.req;

  if (method === "POST" && path === "/create-order") {
    return createOrder(context);
  }

  if (method === "GET" && path === "/get-order-meta") {
    return getOrderMeta(context);
  }

  return context.res.json({ error: "Path not found" }, 404);
};
