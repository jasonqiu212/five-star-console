export type CreateClientPayload = {
  name: string;
};

export type UpdateClientPayload = Partial<CreateClientPayload>;
