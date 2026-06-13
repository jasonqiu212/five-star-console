export type OrderMetaClient = {
  $id: string;
  name: string;
};

export type OrderMetaProductType = {
  $id: string;
  name: string;
  isSystem: boolean;
};

export type GetOrderMetaResponse =
  | { success: true; data: { clients: OrderMetaClient[]; productTypes: OrderMetaProductType[] } }
  | { success: false; error: string };

export type CreateOrderPayload = {
  name: string;
};
