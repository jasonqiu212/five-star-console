import { CreateCarBrandPayload } from "shared-types";
import { carBrandRepository } from "./car-brand.repository";

export const carBrandService = {
  async createCarBrand(payload: CreateCarBrandPayload) {
    return carBrandRepository.create(payload);
  },

  async listCarBrands() {
    return carBrandRepository.list();
  },

  async updateCarBrand(id: string, payload: Partial<CreateCarBrandPayload>) {
    return carBrandRepository.update(id, payload);
  },

  async deleteCarBrand(id: string) {
    return carBrandRepository.delete(id);
  },
};
