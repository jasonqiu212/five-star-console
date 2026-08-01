import { CreateProductTypePayload } from "shared-types";
import { productTypeRepository } from "./product-type.repository";

export const productTypeService = {
  async createProductType(payload: CreateProductTypePayload) {
    return productTypeRepository.create({
      name: payload.name,
      isSystem: false,
    });
  },

  async listProductTypes() {
    return productTypeRepository.list();
  },

  async updateProductType(id: string, payload: Partial<CreateProductTypePayload>) {
    return productTypeRepository.update(id, payload);
  },

  async deleteProductType(id: string) {
    return productTypeRepository.delete(id);
  },
};
