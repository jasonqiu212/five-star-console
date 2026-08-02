import { OrderItemLeatherType, OrderItemSeatReplacementScope } from "../appwrite/appwrite";
import { createEnumMeta } from "../utils/enum";

export const OrderItemLeatherTypeMeta = createEnumMeta<OrderItemLeatherType>({
  [OrderItemLeatherType.FULL_LEATHER]: "Full Leather",
  [OrderItemLeatherType.HALF_LEATHER]: "Half Leather",
  [OrderItemLeatherType.PVC]: "PVC",
});

export const OrderItemSeatReplacementScopeMeta = createEnumMeta<OrderItemSeatReplacementScope>({
  [OrderItemSeatReplacementScope.WHOLE]: "Whole",
  [OrderItemSeatReplacementScope.PARTIAL]: "Partial",
});
