export type UpdatePoNumberSequencePayload = {
  nextValue: number;
};

export type CreateClientPayload = {
  name: string;
};

export type UpdateClientPayload = Partial<CreateClientPayload>;

export type CreateCarBrandPayload = {
  name: string;
};

export type UpdateCarBrandPayload = Partial<CreateCarBrandPayload>;

export type CreateCarModelPayload = {
  name: string;
  carBrand: string;
};

export type UpdateCarModelPayload = Partial<CreateCarModelPayload>;

export type CreateProductTypePayload = {
  name: string;
};

export type UpdateProductTypePayload = Partial<CreateProductTypePayload>;
