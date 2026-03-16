import { useUpdateClient } from "@/hooks/api/useClients";
import type { UpdateClientPayload } from "@/types/api";
import { Clients } from "@/types/appwrite";
import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

interface EditClientButtonProps {
  record: Clients;
}

export const EditClientButton: React.FC<EditClientButtonProps> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UpdateClientPayload>();

  const updateMutation = useUpdateClient();

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
    await updateMutation.mutateAsync({
      id: record.$id,
      payload: values,
    });
    handleCancel();
  };

  return (
    <>
      <Button
        color="default"
        type="link"
        icon={<EditOutlined />}
        onClick={handleOpen}
        aria-label="Edit"
      />
      <Modal
        title="Edit Client"
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={updateMutation.isPending}
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
            <Input placeholder="Client name" maxLength={255} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
