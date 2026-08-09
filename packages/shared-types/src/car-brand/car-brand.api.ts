import { CarBrand } from "../appwrite/appwrite";

export type CreateCarBrandRequest = Pick<CarBrand, "name">;

export type UpdateCarBrandRequest = Partial<CreateCarBrandRequest> & { id: string };
