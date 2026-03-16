import { useCreateCarModel } from "@/hooks/api/useCarModel";
import { CreateCarModelPayload } from "@/types/api";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";

interface AddCarModelButtonProps {
  id: string;
}

export const AddCarModelButton: React.FC<AddCarModelButtonProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<CreateCarModelPayload>();

  const createMutation = useCreateCarModel();

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
    await createMutation.mutateAsync({ ...values, carBrand: id });
    handleCancel();
  };

  return (
    <>
      <Button type="link" size="small" icon={<PlusOutlined />} onClick={handleOpen} />
      <Modal
        title="Add Car Model"
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
            <Input placeholder="Car model name" maxLength={255} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
