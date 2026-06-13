export type CreateCarBrandPayload = {
  name: string;
};

export type UpdateCarBrandPayload = Partial<CreateCarBrandPayload>;
