import React from "react";
import { Tag, TagProps } from "antd";
import { BatamProductionStatus, BatamProductionStatusMeta } from "shared-types";

interface BatamProductionStatusTagConfig {
  color?: string;
  icon?: React.ReactNode;
}

const BatamProductionStatusTagConfigs: Record<
  BatamProductionStatus,
  BatamProductionStatusTagConfig
> = {
  [BatamProductionStatus.WAITING]: {
    color: "default",
  },
  [BatamProductionStatus.PRODUCTION]: {
    color: "blue",
  },
  [BatamProductionStatus.READY_FOR_SHIPPING]: {
    color: "geekblue",
  },
  [BatamProductionStatus.SHIPPING]: {
    color: "gold",
  },
  [BatamProductionStatus.ARRIVED]: {
    color: "green",
  },
};

interface BatamProductionStatusTagProps extends TagProps {
  status: BatamProductionStatus;
  showIcon?: boolean;
}

export const BatamProductionStatusTag: React.FC<BatamProductionStatusTagProps> = ({
  status,
  showIcon = false,
  ...restProps
}) => {
  const config = BatamProductionStatusTagConfigs[status];

  if (!config) {
    return null;
  }

  return (
    <Tag color={config.color ?? "default"} icon={showIcon ? config.icon : undefined} {...restProps}>
      {BatamProductionStatusMeta.getLabel(status)}
    </Tag>
  );
};
