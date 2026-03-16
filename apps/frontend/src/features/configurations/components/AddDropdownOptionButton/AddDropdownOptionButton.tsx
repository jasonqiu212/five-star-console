import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

export interface AddDropdownOptionButtonProps {
  /** Label for the trigger button (e.g. "Add Product Type") */
  buttonLabel: string;
  /** Title of the modal */
  modalTitle: string;
  /** Placeholder for the name input */
  inputPlaceholder: string;
  /** Called with the form values when the user submits. Component handles close and reset on success. */
  onSubmit: (values: { name: string }) => Promise<void>;
  /** Whether the submit action is in progress (e.g. mutation.isPending) */
  isPending?: boolean;
}

export const AddDropdownOptionButton: React.FC<AddDropdownOptionButtonProps> = ({
  buttonLabel,
  modalTitle,
  inputPlaceholder,
  onSubmit,
  isPending = false,
}) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<{ name: string }>();

  const handleOpen = () => {
    form.resetFields();
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
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
        {buttonLabel}
      </Button>
      <Modal
        title={modalTitle}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={isPending}
        okText="Add"
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
