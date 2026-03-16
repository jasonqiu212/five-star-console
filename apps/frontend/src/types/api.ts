export type CreateClientPayload = {
  name: string;
};

export type UpdateClientPayload = Partial<CreateClientPayload>;

export type CreateProductTypePayload = {
  name: string;
};

export type UpdateProductTypePayload = Partial<CreateProductTypePayload>;
