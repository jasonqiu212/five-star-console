import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";
import { OrderFormValues } from "../../types";
import {
  OrderItemLeatherTypeMeta,
  OrderItemSeatReplacementScopeMeta,
  type ProductType,
} from "shared-types";

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
        <Form.List
          name={FORM_LIST_NAME}
          rules={[
            {
              validator: async (_, items) => {
                if (!items || items.length < 1) {
                  return Promise.reject(new Error("Please add at least 1 order item"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
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
                    <Select options={productTypeOptions} />
                  </Form.Item>

                  <Form.Item noStyle shouldUpdate>
                    {() => {
                      const productTypeId = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "productType",
                      ]);
                      const selectedType = productTypes.find((pt) => pt.$id === productTypeId);
                      if (selectedType?.name !== "Leather Seats") return null;

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
                            <Radio.Group options={OrderItemLeatherTypeMeta.options} />
                          </Form.Item>

                          <Form.Item
                            label="Seat Replacement Scope"
                            name={[field.name, "seatReplacementScope"]}
                            rules={[
                              { required: true, message: "Please select seat replacement scope" },
                            ]}
                          >
                            <Radio.Group options={OrderItemSeatReplacementScopeMeta.options} />
                          </Form.Item>

                          {scope === "Partial" && (
                            <Form.Item
                              label="Partial Set Details"
                              name={[field.name, "partialSetDetails"]}
                              rules={[
                                { required: true, message: "Please enter partial set details" },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          )}

                          <Form.Item
                            label="Color"
                            name={[field.name, "color"]}
                            rules={[{ required: true, message: "Please enter color" }]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Thread"
                            name={[field.name, "thread"]}
                            rules={[{ required: true, message: "Please enter thread" }]}
                          >
                            <Input />
                          </Form.Item>
                        </>
                      );
                    }}
                  </Form.Item>

                  <Form.Item noStyle shouldUpdate>
                    {() => {
                      const productTypeId = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "productType",
                      ]);
                      const selectedType = productTypes.find((pt) => pt.$id === productTypeId);
                      if (selectedType?.name === "Leather Seats") return null;

                      return (
                        <>
                          <Form.Item label="Details" name={[field.name, "details"]}>
                            <Input />
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
                    <InputNumber min={0} step={0.01} prefix="S$" style={{ width: "100%" }} />
                  </Form.Item>

                  <Form.Item noStyle shouldUpdate>
                    {() => {
                      const productTypeId = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "productType",
                      ]);
                      const selectedType = productTypes.find((pt) => pt.$id === productTypeId);
                      if (selectedType?.name !== "Leather Seats") return null;

                      const isBtProduction = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "isBtProduction",
                      ]);
                      const isSgProduction = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "isSgProduction",
                      ]);
                      const isSgReadyStock = form.getFieldValue([
                        FORM_LIST_NAME,
                        field.name,
                        "isSgReadyStock",
                      ]);

                      return (
                        <>
                          <Divider titlePlacement="start">
                            <Flex align="center" gap={4} style={{ fontWeight: 600, fontSize: 14 }}>
                              Production Details
                              {/* <Tooltip title="Details about the production of this item, such as color, thread, and design.">
                        <InfoCircleOutlined />
                      </Tooltip> */}
                            </Flex>
                          </Divider>

                          <Form.Item
                            label="Door Panel Details"
                            name={[field.name, "doorPanelDetails"]}
                          >
                            <Input placeholder="e.g., color/stitching" />
                          </Form.Item>

                          <Form.Item label="Design Details" name={[field.name, "designDetails"]}>
                            <Input />
                          </Form.Item>

                          <Form.Item
                            label="Batam Production?"
                            name={[field.name, "isBtProduction"]}
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>

                          {isBtProduction && (
                            <Form.Item
                              label="Batam Production Scope"
                              name={[field.name, "btProductionScope"]}
                            >
                              <Input />
                            </Form.Item>
                          )}

                          <Form.Item
                            label="SG Production?"
                            name={[field.name, "isSgProduction"]}
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>

                          {isSgProduction && (
                            <Form.Item
                              label="SG Production Scope"
                              name={[field.name, "sgProductionScope"]}
                            >
                              <Input />
                            </Form.Item>
                          )}

                          <Form.Item
                            label="Use SG Ready Stock?"
                            name={[field.name, "isSgReadyStock"]}
                            valuePropName="checked"
                          >
                            <Switch />
                          </Form.Item>

                          {isSgReadyStock && (
                            <>
                              <Form.Item
                                label="SG Ready Stock Scope"
                                name={[field.name, "sgReadyStockScope"]}
                              >
                                <Input />
                              </Form.Item>
                              <Form.Item
                                label="Replace Stock?"
                                name={[field.name, "replaceStock"]}
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                            </>
                          )}
                        </>
                      );
                    }}
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()} block>
                Add Item
              </Button>

              <Form.Item>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </Flex>
          )}
        </Form.List>
      </div>
    </Card>
  );
};
