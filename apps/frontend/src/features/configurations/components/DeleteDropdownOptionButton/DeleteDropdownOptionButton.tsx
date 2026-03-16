import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import React from "react";

export interface DeleteDropdownOptionButtonProps {
  /** Title shown in the confirmation popover */
  title: string;
  /** Description shown in the confirmation popover */
  description: string;
  /** Called when the user confirms deletion */
  onConfirm: () => Promise<unknown>;
  /** When true, the trigger button is disabled (e.g. mutation.isPending) */
  isPending?: boolean;
}

export const DeleteDropdownOptionButton: React.FC<DeleteDropdownOptionButtonProps> = ({
  title,
  description,
  onConfirm,
  isPending = false,
}) => (
  <Popconfirm
    title={title}
    description={description}
    onConfirm={() => onConfirm()}
    okText="Delete"
    okButtonProps={{ danger: true }}
    cancelText="Cancel"
  >
    <Button
      type="link"
      size="small"
      danger
      icon={<DeleteOutlined />}
      aria-label="Delete"
      disabled={isPending}
    />
  </Popconfirm>
);
