import { Card, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import type { CarBrand, Client } from "shared-types";

interface BasicInformationSectionProps {
  clients: Client[];
  carBrands: CarBrand[];
}

export const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  clients,
  carBrands,
}) => {
  const form = Form.useFormInstance();
  const selectedBrandName = Form.useWatch("carBrand", form);

  const clientOptions = clients.map((c) => ({ label: c.name, value: c.name }));
  const carBrandOptions = carBrands.map((b) => ({ label: b.name, value: b.name }));

  const selectedBrand = carBrands.find((b) => b.name === selectedBrandName);
  const carModelOptions = (selectedBrand?.carModels ?? []).map((m) => ({
    label: m.name,
    value: m.name,
  }));

  return (
    <Card title="Basic Information" style={{ width: "100%" }}>
      <div style={{ maxWidth: 850, marginInline: "auto" }}>
        <Form.Item
          label="Order date"
          name="orderDate"
          rules={[{ required: true, message: "Please enter order date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="PO number"
          name="poNumber"
          rules={[{ required: true, message: "Please enter PO number" }]}
        >
          <Input placeholder="Enter PO number" disabled />
        </Form.Item>

        <Form.Item
          label="Client"
          name="client"
          rules={[{ required: true, message: "Please select a client" }]}
        >
          <Select
            placeholder="Select client"
            options={clientOptions}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item label="Client details" name="clientDetails">
          <Input placeholder="Enter client details" />
        </Form.Item>

        <Form.Item
          label="Car brand"
          name="carBrand"
          rules={[{ required: true, message: "Please select a car brand" }]}
        >
          <Select
            placeholder="Select car brand"
            options={carBrandOptions}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={() => form.setFieldValue("carModel", undefined)}
          />
        </Form.Item>

        <Form.Item
          label="Car model"
          name="carModel"
          rules={[{ required: true, message: "Please select a car model" }]}
        >
          <Select
            placeholder={selectedBrandName ? "Select car model" : "Select a car brand first"}
            options={carModelOptions}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            disabled={!selectedBrandName}
          />
        </Form.Item>

        <Form.Item
          label="Car plate"
          name="carPlate"
          rules={[{ required: true, message: "Please enter car plate" }]}
        >
          <Input placeholder="Enter car plate" />
        </Form.Item>

        <Form.Item label="Handover date" name="handoverDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </div>
    </Card>
  );
};
