import React from "react";
import { Tag, TagProps } from "antd";
import { InstallationStatus, InstallationStatusMeta } from "shared-types";

interface InstallationStatusTagConfig {
  color?: string;
  icon?: React.ReactNode;
}

const InstallationStatusTagConfigs: Record<InstallationStatus, InstallationStatusTagConfig> = {
  [InstallationStatus.WAITING]: {
    color: "default",
  },
  [InstallationStatus.SCHEDULED_WORKSHOP]: {
    color: "blue",
  },
  [InstallationStatus.SCHEDULED_ON_SITE]: {
    color: "geekblue",
  },
  [InstallationStatus.CAR_RECEIVED]: {
    color: "cyan",
  },
  [InstallationStatus.DISMANTLING]: {
    color: "gold",
  },
  [InstallationStatus.READY_FOR_WRAPPING]: {
    color: "orange",
  },
  [InstallationStatus.WRAPPING]: {
    color: "purple",
  },
  [InstallationStatus.READY_FOR_REINSTALLATION]: {
    color: "magenta",
  },
  [InstallationStatus.REINSTALLATION]: {
    color: "volcano",
  },
  [InstallationStatus.DONE]: {
    color: "green",
  },
};

interface InstallationStatusTagProps extends TagProps {
  status: InstallationStatus;
  showIcon?: boolean;
}

export const InstallationStatusTag: React.FC<InstallationStatusTagProps> = ({
  status,
  showIcon = false,
  ...restProps
}) => {
  const config = InstallationStatusTagConfigs[status];

  if (!config) {
    return null;
  }

  return (
    <Tag color={config.color ?? "default"} icon={showIcon ? config.icon : undefined} {...restProps}>
      {InstallationStatusMeta.getLabel(status)}
    </Tag>
  );
};
