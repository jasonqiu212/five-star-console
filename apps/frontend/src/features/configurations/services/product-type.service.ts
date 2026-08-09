import { CreateProductTypeRequest, UpdateProductTypeRequest } from "shared-types";
import { productTypeRepository } from "./product-type.repository";

export const productTypeService = {
  async createProductType(params: CreateProductTypeRequest) {
    return productTypeRepository.create({
      name: params.name,
      isSystem: false,
    });
  },

  async listProductTypes() {
    return productTypeRepository.list();
  },

  async updateProductType(params: UpdateProductTypeRequest) {
    const { id, name } = params;
    return productTypeRepository.update(id, { name });
  },

  async deleteProductType(id: string) {
    return productTypeRepository.delete(id);
  },
};
