import React from "react";
import { Tag, TagProps } from "antd";
import { InvoiceStatus, InvoiceStatusMeta } from "shared-types";

interface InvoiceStatusTagConfig {
  color?: string;
  icon?: React.ReactNode;
}

const InvoiceStatusTagConfigs: Record<InvoiceStatus, InvoiceStatusTagConfig> = {
  [InvoiceStatus.OPEN]: {
    color: "blue",
  },
  [InvoiceStatus.PAID]: {
    color: "green",
  },
  [InvoiceStatus.CANCELLED]: {
    color: "default",
  },
};

interface InvoiceStatusTagProps extends TagProps {
  status: InvoiceStatus;
  showIcon?: boolean;
}

export const InvoiceStatusTag: React.FC<InvoiceStatusTagProps> = ({
  status,
  showIcon = false,
  ...restProps
}) => {
  const config = InvoiceStatusTagConfigs[status];

  if (!config) {
    return null;
  }

  return (
    <Tag color={config.color ?? "default"} icon={showIcon ? config.icon : undefined} {...restProps}>
      {InvoiceStatusMeta.getLabel(status)}
    </Tag>
  );
};
