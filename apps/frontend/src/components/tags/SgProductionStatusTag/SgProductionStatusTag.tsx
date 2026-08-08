import React from "react";
import { Tag, TagProps } from "antd";
import { SgProductionStatus, SgProductionStatusMeta } from "shared-types";

interface SgProductionStatusTagConfig {
  color?: string;
  icon?: React.ReactNode;
}

const SgProductionStatusTagConfigs: Record<SgProductionStatus, SgProductionStatusTagConfig> = {
  [SgProductionStatus.WAITING]: {
    color: "default",
  },
  [SgProductionStatus.PRODUCTION]: {
    color: "blue",
  },
  [SgProductionStatus.DONE]: {
    color: "green",
  },
};

interface SgProductionStatusTagProps extends TagProps {
  status: SgProductionStatus;
  showIcon?: boolean;
}

export const SgProductionStatusTag: React.FC<SgProductionStatusTagProps> = ({
  status,
  showIcon = false,
  ...restProps
}) => {
  const config = SgProductionStatusTagConfigs[status];

  if (!config) {
    return null;
  }

  return (
    <Tag color={config.color ?? "default"} icon={showIcon ? config.icon : undefined} {...restProps}>
      {SgProductionStatusMeta.getLabel(status)}
    </Tag>
  );
};
