import { ProductType } from "../appwrite/appwrite";

export type CreateProductTypeRequest = Pick<ProductType, "name">;

export type UpdateProductTypeRequest = Partial<CreateProductTypeRequest> & { id: string };
