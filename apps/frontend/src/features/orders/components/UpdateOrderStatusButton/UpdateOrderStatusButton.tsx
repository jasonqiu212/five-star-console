import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Select } from "antd";
import React, { useState } from "react";
import {
  BatamProductionStatusMeta,
  InstallationStatusMeta,
  Order,
  SgProductionStatusMeta,
} from "shared-types";
import { useUpdateOrderStatus } from "../../hooks/order.hooks";

type UpdateOrderStatusFormValues = Pick<
  Order,
  "batamProductionStatus" | "sgProductionStatus" | "installationStatus"
>;

export interface UpdateOrderStatusButtonProps {
  /** Order row being updated */
  record: Order;
}

export const UpdateOrderStatusButton: React.FC<UpdateOrderStatusButtonProps> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UpdateOrderStatusFormValues>();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const handleOpen = () => {
    form.setFieldsValue({
      batamProductionStatus: record.batamProductionStatus,
      sgProductionStatus: record.sgProductionStatus,
      installationStatus: record.installationStatus,
    });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await updateOrderStatusMutation.mutateAsync({ id: record.$id, ...values });
    handleCancel();
  };

  return (
    <>
      <Button
        type="text"
        icon={<ArrowRightOutlined />}
        onClick={handleOpen}
        aria-label="Update status"
      />
      <Modal
        title={`Update PO Status - ${record.poNumber}`}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={updateOrderStatusMutation.isPending}
        okText="Save"
        destroyOnHidden
        centered
      >
        <Form form={form} layout="vertical">
          {record.batamProductionStatus !== null && (
            <Form.Item
              name="batamProductionStatus"
              label="Batam Production"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select options={BatamProductionStatusMeta.options} />
            </Form.Item>
          )}
          {record.sgProductionStatus !== null && (
            <Form.Item
              name="sgProductionStatus"
              label="SG Production"
              rules={[{ required: true, message: "Please select a status" }]}
            >
              <Select options={SgProductionStatusMeta.options} />
            </Form.Item>
          )}
          <Form.Item
            name="installationStatus"
            label="Installation"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select options={InstallationStatusMeta.options} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
