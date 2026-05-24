import { createOrder } from "./handlers/createOrder.js";

export default async (context: any) => {
  const { method, path } = context.req;

  if (method === "POST" && path === "/orders") {
    return createOrder(context);
  }

  return context.res.json({ error: "Not found" }, 404);
};
