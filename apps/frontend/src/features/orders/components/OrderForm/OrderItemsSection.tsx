import { Button, Card, Flex, Form, FormInstance, Input, InputNumber, Radio, Select } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { OrderFormValues } from "../../types";
import type { ProductType } from "shared-types";

const FORM_LIST_NAME = "items";

interface OrderItemsSectionProps {
  form: FormInstance<OrderFormValues>;
  productTypes: ProductType[];
}

export const OrderItemsSection: React.FC<OrderItemsSectionProps> = ({ form, productTypes }) => {
  const productTypeOptions = productTypes.map((pt) => ({ label: pt.name, value: pt.$id }));

  return (
    <Card title="Order Items" style={{ width: "100%" }}>
      <div style={{ maxWidth: 850, marginInline: "auto" }}>
        <Form.List name={FORM_LIST_NAME}>
          {(fields, { add, remove }) => (
            <Flex vertical gap="small">
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <Button
                      danger
                      type="text"
                      onClick={() => remove(field.name)}
                      icon={<CloseOutlined />}
                    />
                  }
                >
                  <Form.Item
                    label="Product Type"
                    name={[field.name, "productType"]}
                    rules={[{ required: true, message: "Please select product type" }]}
                  >
                    <Select placeholder="Select product type" options={productTypeOptions} />
                  </Form.Item>

                  <Form.Item noStyle shouldUpdate>
                    {() => {
                      const productTypeId = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "productType",
                      ]);
                      const selectedType = productTypes.find((pt) => pt.$id === productTypeId);
                      if (!selectedType?.isSystem) return null;

                      const scope = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "seatReplacementScope",
                      ]);

                      return (
                        <>
                          <Form.Item
                            label="Leather Type"
                            name={[field.name, "leatherType"]}
                            rules={[{ required: true, message: "Please select leather type" }]}
                          >
                            <Radio.Group
                              options={[
                                { label: "Full Leather", value: "FullLeather" },
                                { label: "Half Leather", value: "HalfLeather" },
                                { label: "PVC", value: "PVC" },
                              ]}
                            />
                          </Form.Item>

                          <Form.Item
                            label="Seat Replacement Scope"
                            name={[field.name, "seatReplacementScope"]}
                            rules={[
                              { required: true, message: "Please select seat replacement scope" },
                            ]}
                          >
                            <Radio.Group
                              options={[
                                { label: "Whole", value: "Whole" },
                                { label: "Partial", value: "Partial" },
                              ]}
                            />
                          </Form.Item>

                          {scope === "Partial" && (
                            <Form.Item
                              label="Partial Set Details"
                              name={[field.name, "partialSetDetails"]}
                              rules={[
                                { required: true, message: "Please enter partial set details" },
                              ]}
                            >
                              <Input placeholder="Enter partial set details" />
                            </Form.Item>
                          )}

                          <Form.Item
                            label="Color"
                            name={[field.name, "color"]}
                            rules={[{ required: true, message: "Please enter color" }]}
                          >
                            <Input placeholder="Enter color" />
                          </Form.Item>

                          <Form.Item
                            label="Thread"
                            name={[field.name, "thread"]}
                            rules={[{ required: true, message: "Please enter thread" }]}
                          >
                            <Input placeholder="Enter thread" />
                          </Form.Item>
                        </>
                      );
                    }}
                  </Form.Item>

                  <Form.Item
                    label="Net Price"
                    name={[field.name, "netPrice"]}
                    rules={[{ required: true, message: "Please enter net price" }]}
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      placeholder="0.00"
                      prefix="S$"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()} block>
                Add Item
              </Button>
            </Flex>
          )}
        </Form.List>
      </div>
    </Card>
  );
};
