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

export enum BatamProductionStatus {
  WAITING = "Waiting",
  PRODUCTION = "Production",
  READY_FOR_SHIPPING = "ReadyForShipping",
  SHIPPING = "Shipping",
  ARRIVED = "Arrived",
}

export const BatamProductionStatusMeta = createEnumMeta<BatamProductionStatus>({
  [BatamProductionStatus.WAITING]: "Waiting",
  [BatamProductionStatus.PRODUCTION]: "Production",
  [BatamProductionStatus.READY_FOR_SHIPPING]: "Ready for Shipping",
  [BatamProductionStatus.SHIPPING]: "Shipping",
  [BatamProductionStatus.ARRIVED]: "Arrived",
});

export enum SgProductionStatus {
  WAITING = "Waiting",
  PRODUCTION = "Production",
  DONE = "Done",
}

export const SgProductionStatusMeta = createEnumMeta<SgProductionStatus>({
  [SgProductionStatus.WAITING]: "Waiting",
  [SgProductionStatus.PRODUCTION]: "Production",
  [SgProductionStatus.DONE]: "Done",
});

export enum InstallationStatus {
  WAITING = "Waiting",
  SCHEDULED_WORKSHOP = "ScheduledWorkshop",
  SCHEDULED_ON_SITE = "ScheduledOnSite",
  CAR_RECEIVED = "CarReceived",
  DISMANTLING = "Dismantling",
  READY_FOR_WRAPPING = "ReadyForWrapping",
  WRAPPING = "Wrapping",
  READY_FOR_REINSTALLATION = "ReadyForReinstallation",
  REINSTALLATION = "Reinstallation",
  DONE = "Done",
}

export const InstallationStatusMeta = createEnumMeta<InstallationStatus>({
  [InstallationStatus.WAITING]: "Waiting",
  [InstallationStatus.SCHEDULED_WORKSHOP]: "Scheduled (Workshop)",
  [InstallationStatus.SCHEDULED_ON_SITE]: "Scheduled (On-site)",
  [InstallationStatus.CAR_RECEIVED]: "Car Received",
  [InstallationStatus.DISMANTLING]: "Dismantling",
  [InstallationStatus.READY_FOR_WRAPPING]: "Ready for Wrapping",
  [InstallationStatus.WRAPPING]: "Wrapping",
  [InstallationStatus.READY_FOR_REINSTALLATION]: "Ready for Reinstallation",
  [InstallationStatus.REINSTALLATION]: "Reinstallation",
  [InstallationStatus.DONE]: "Done",
});

export enum OrderStatus {
  ONGOING = "Ongoing",
  COMPLETED = "Completed",
}

export const OrderStatusMeta = createEnumMeta<OrderStatus>({
  [OrderStatus.ONGOING]: "Ongoing",
  [OrderStatus.COMPLETED]: "Completed",
});
