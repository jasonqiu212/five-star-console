import { useCreateClient } from "@/hooks/api/useClients";
import type { CreateClientPayload } from "@/types/api";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

export const AddClientButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<CreateClientPayload>();

  const createMutation = useCreateClient();

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
    await createMutation.mutateAsync(values);
    handleCancel();
  };

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpen}>
        Add client
      </Button>
      <Modal
        title="Add Client"
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={createMutation.isPending}
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
            <Input placeholder="Client name" maxLength={255} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
