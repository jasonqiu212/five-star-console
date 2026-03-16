import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

export interface EditDropdownOptionRecord {
  $id: string;
  name: string;
}

export interface EditDropdownOptionButtonProps {
  /** Record to edit (must have $id and name) */
  record: EditDropdownOptionRecord;
  /** Title of the modal */
  modalTitle: string;
  /** Placeholder for the name input */
  inputPlaceholder: string;
  /** Called with the form values when the user submits. Component handles close and reset on success. */
  onSubmit: (values: { name: string }) => Promise<unknown>;
  /** Whether the submit action is in progress (e.g. mutation.isPending) */
  isPending?: boolean;
}

export const EditDropdownOptionButton: React.FC<EditDropdownOptionButtonProps> = ({
  record,
  modalTitle,
  inputPlaceholder,
  onSubmit,
  isPending = false,
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<{ name: string }>();

  const handleOpen = () => {
    form.setFieldsValue({ name: record.name });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await onSubmit(values);
    handleCancel();
  };

  return (
    <>
      <Button
        color="default"
        size="small"
        type="link"
        icon={<EditOutlined />}
        onClick={handleOpen}
        aria-label="Edit"
      />
      <Modal
        title={modalTitle}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isPending}
        okText="Save"
        destroyOnHidden
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder={inputPlaceholder} maxLength={255} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
