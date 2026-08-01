import React from "react";
import { Card, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Order } from "shared-types";
import { formatDate } from "@/utils";
import { useListOrders } from "@/features/orders/hooks/order.hooks";

export const PurchaseOrders: React.FC = () => {
  const { data: orders } = useListOrders();

  const columns: ColumnsType<Order> = [
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
      render: (value) => formatDate(value),
    },
    {
      title: "Client",
      key: "client",
      render: (record) => record.client,
    },
    {
      title: "Car Model",
      key: "carModel",
      render: (record) => `${record.carBrand} ${record.carModel}`,
    },
    {
      title: "Car Plate",
      dataIndex: "carPlate",
      key: "carPlate",
      sorter: (a, b) => a.carPlate.localeCompare(b.carPlate),
    },
  ];

  return (
    <Card size="small" variant="borderless">
      <Tabs
        items={[
          {
            key: "ongoing",
            label: "Ongoing",
            children: (
              <Table
                size="small"
                columns={columns}
                dataSource={orders?.rows}
                pagination={{ pageSize: 10 }}
                rowKey="$id"
              />
            ),
          },
          {
            key: "completed",
            label: "Completed",
            children: null,
          },
        ]}
      />
    </Card>
  );
};
