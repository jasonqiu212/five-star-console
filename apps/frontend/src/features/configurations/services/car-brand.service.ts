import { CreateCarBrandRequest, UpdateCarBrandRequest } from "shared-types";
import { carBrandRepository } from "./car-brand.repository";

export const carBrandService = {
  async createCarBrand(params: CreateCarBrandRequest) {
    return carBrandRepository.create(params);
  },

  async listCarBrands() {
    return carBrandRepository.list();
  },

  async updateCarBrand(params: UpdateCarBrandRequest) {
    const { id, name } = params;
    return carBrandRepository.update(id, { name });
  },

  async deleteCarBrand(id: string) {
    return carBrandRepository.delete(id);
  },
};
