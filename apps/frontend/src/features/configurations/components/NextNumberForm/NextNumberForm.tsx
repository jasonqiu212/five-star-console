import { Button, InputNumber, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";

export interface NextNumberFormProps {
  /** Current value (e.g. from API). */
  value: number | null;
  /** Called when user saves; receives the new number. */
  onUpdate: (newValue: number) => void | Promise<void>;
  /** True while the initial value is loading. */
  isLoading?: boolean;
  /** True while the save/update request is in progress. */
  isUpdating?: boolean;
  /** Shown when value is null (e.g. no sequence configured). */
  noValueMessage?: React.ReactNode;
}

export const NextNumberForm: React.FC<NextNumberFormProps> = ({
  value,
  onUpdate,
  isLoading = false,
  isUpdating = false,
  noValueMessage = "No value configured",
}) => {
  const [localValue, setLocalValue] = useState<number | null>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSave = () => {
    if (localValue == null) return;
    void onUpdate(localValue);
  };

  const handleCancel = () => {
    setLocalValue(value);
  };

  const isDirty = value != null && localValue !== value;

  if (isLoading) {
    return <Spin size="small" />;
  }

  if (value == null) {
    return <span>{noValueMessage}</span>;
  }

  return (
    <Space size="small">
      <InputNumber
        min={0}
        value={localValue ?? undefined}
        onChange={(v) => setLocalValue(v ?? null)}
        style={{ width: 100 }}
      />
      <Button type="primary" loading={isUpdating} onClick={handleSave} disabled={!isDirty}>
        Save
      </Button>
      <Button onClick={handleCancel} disabled={!isDirty}>
        Cancel
      </Button>
    </Space>
  );
};
