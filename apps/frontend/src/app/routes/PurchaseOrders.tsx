import React, { useState } from "react";
import { Button, Card, Flex, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BatamProductionStatus, InstallationStatus, Order, SgProductionStatus } from "shared-types";
import { formatDate } from "@/shared/utils";
import { useListOrders } from "@/features/orders/hooks/order.hooks";
import { BatamProductionStatusTag } from "@/components/tags/BatamProductionStatusTag";
import { SgProductionStatusTag } from "@/components/tags/SgProductionStatusTag";
import { InstallationStatusTag } from "@/components/tags/InstallationStatusTag";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";

export const PurchaseOrders: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const { data: orders } = useListOrders({
    pagination: { limit: pageSize, offset: (page - 1) * pageSize },
  });

  const columns: ColumnsType<Order> = [
    {
      title: "PO Number",
      dataIndex: "poNumber",
      key: "poNumber",
      width: 120,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      width: 120,
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
    {
      title: "Batam Production",
      dataIndex: "batam_production_status",
      key: "batam_production_status",
      width: 150,
      render: (value: BatamProductionStatus | null) =>
        value ? <BatamProductionStatusTag status={value} /> : "-",
    },
    {
      title: "SG Production",
      dataIndex: "sg_production_status",
      key: "sg_production_status",
      width: 120,
      render: (value: SgProductionStatus | null) =>
        value ? <SgProductionStatusTag status={value} /> : "-",
    },
    {
      title: "Installation",
      dataIndex: "installation_status",
      key: "installation_status",
      width: 100,
      render: (value: InstallationStatus | null) =>
        value ? <InstallationStatusTag status={value} /> : "-",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: () => {
        return (
          <Flex align="center" gap="small">
            <Button type="text" icon={<EyeOutlined />} />
            <Button type="text" icon={<EditOutlined />} />
          </Flex>
        );
      },
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
                pagination={{
                  current: page,
                  pageSize,
                  total: orders?.total,
                  showTotal: (total) => `Total ${total} orders`,
                  onChange: (nextPage, nextPageSize) => {
                    setPage(nextPage);
                    setPageSize(nextPageSize);
                  },
                }}
                rowKey="$id"
                scroll={{ x: "max-content" }}
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
