import { CarBrand, Client, ProductType } from "../appwrite/appwrite";

export type CreateOrderPayload = {
  name: string;
};

export type GetOrderMetaResponse = {
  clients: Client[];
  productTypes: ProductType[];
  nextPoNumber: number;
  nextInvoiceNumbers: {
    fiveStarAutoLeather: number;
    leatherAndStitch: number;
  };
  carBrands: CarBrand[];
};
