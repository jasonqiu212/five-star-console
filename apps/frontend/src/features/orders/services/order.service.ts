import { CreateOrderPayload, Order } from "shared-types";
import * as orderRepository from "./order.repository";
import { Models } from "appwrite";

export function createOrder(payload: CreateOrderPayload): Promise<void> {
  return Promise.resolve();
}

export function getOrderMeta(): Promise<void> {
  return Promise.resolve();
}

export async function listOrders(): Promise<Models.RowList<Order>> {
  return orderRepository.list();
}

export async function getOrderById(orderId: string): Promise<Order> {
  return orderRepository.getById(orderId);
}
