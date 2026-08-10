import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, Select } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Invoice, InvoiceStatus, InvoiceStatusMeta } from "shared-types";
import { useUpdateInvoiceStatus } from "../../hooks/invoice.hooks";

type UpdateInvoiceStatusFormValues = {
  status: InvoiceStatus;
  paidDate: dayjs.Dayjs | null;
  cancelledDate: dayjs.Dayjs | null;
};

export interface UpdateInvoiceStatusButtonProps {
  /** Invoice row being updated */
  record: Invoice;
}

export const UpdateInvoiceStatusButton: React.FC<UpdateInvoiceStatusButtonProps> = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<UpdateInvoiceStatusFormValues>();
  const status = Form.useWatch("status", form);
  const updateInvoiceStatusMutation = useUpdateInvoiceStatus();

  const handleOpen = () => {
    form.setFieldsValue({
      status: record.status,
      paidDate: record.paidDate ? dayjs(record.paidDate) : null,
      cancelledDate: record.cancelledDate ? dayjs(record.cancelledDate) : null,
    });
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleStatusChange = (value: InvoiceStatus) => {
    form.setFieldValue("paidDate", value === InvoiceStatus.PAID ? dayjs() : null);
    form.setFieldValue("cancelledDate", value === InvoiceStatus.CANCELLED ? dayjs() : null);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await updateInvoiceStatusMutation.mutateAsync({
      id: record.$id,
      status: values.status,
      paidDate: values.paidDate?.format("YYYY-MM-DD") ?? null,
      cancelledDate: values.cancelledDate?.format("YYYY-MM-DD") ?? null,
    });
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
        title={`Update Invoice Status - ${record.invoiceNumber}`}
        open={open}
        onOk={handleSubmit}
        onCancel={handleCancel}
        confirmLoading={updateInvoiceStatusMutation.isPending}
        okText="Save"
        destroyOnHidden
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select options={InvoiceStatusMeta.options} onChange={handleStatusChange} />
          </Form.Item>
          {status === InvoiceStatus.PAID && (
            <Form.Item
              name="paidDate"
              label="Paid Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} allowClear={false} />
            </Form.Item>
          )}
          {status === InvoiceStatus.CANCELLED && (
            <Form.Item
              name="cancelledDate"
              label="Cancelled Date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker style={{ width: "100%" }} allowClear={false} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
