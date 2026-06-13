export type CreateCarModelPayload = {
  name: string;
  carBrand: string;
};

export type UpdateCarModelPayload = Partial<CreateCarModelPayload>;
