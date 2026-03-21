import React from "react";
import { Card, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useListOrders } from "@/hooks/api/useOrder";
import { Order } from "@/types/appwrite";

export const PurchaseOrders: React.FC = () => {
  const { data: orders } = useListOrders();

  const columns: ColumnsType<Order> = [
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
    },
    {
      title: "Client",
      key: "client",
      render: (record) => `${record.client}${record.salesperson ? ` (${record.salesperson})` : ""}`,
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
    <Card size="small">
      <Table
        size="small"
        columns={columns}
        dataSource={orders?.rows}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};
