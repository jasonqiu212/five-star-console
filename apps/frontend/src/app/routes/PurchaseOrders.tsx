import React, { useState } from "react";
import { Button, Card, Flex, Table, Tabs, Tooltip, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import {
  BatamProductionStatus,
  BatamProductionStatusMeta,
  InstallationStatus,
  InstallationStatusMeta,
  LEATHER_SEATS_PRODUCT_TYPE_NAME,
  ListOrdersRequest,
  Order,
  OrderItem,
  OrderStatus,
  OrderStatusMeta,
  SgProductionStatus,
  SgProductionStatusMeta,
} from "shared-types";
import { formatDate } from "@/shared/utils";
import { useListOrders } from "@/features/orders/hooks/order.hooks";
import { BatamProductionStatusTag } from "@/components/tags/BatamProductionStatusTag";
import { SgProductionStatusTag } from "@/components/tags/SgProductionStatusTag";
import { InstallationStatusTag } from "@/components/tags/InstallationStatusTag";
import { UpdateOrderStatusButton } from "@/features/orders/components/UpdateOrderStatusButton";
import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";

const renderOrderItemDetails = (item: OrderItem): string => {
  if (item.productType === LEATHER_SEATS_PRODUCT_TYPE_NAME) {
    return `${LEATHER_SEATS_PRODUCT_TYPE_NAME} (${item.color} with ${item.thread} thread)`;
  }
  return item.productType;
};

export const PurchaseOrders: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sorter, setSorter] = useState<ListOrdersRequest["sorter"]>();
  const [filters, setFilters] = useState<ListOrdersRequest["filters"]>({
    orderStatus: OrderStatus.ONGOING,
  });
  const { data: orders } = useListOrders({
    pagination: { limit: pageSize, offset: (page - 1) * pageSize },
    sorter,
    filters,
  });

  const handleTableChange: TableProps<Order>["onChange"] = (
    paginationConfig,
    tableFilters,
    sorter,
    extra
  ) => {
    const sorterResult = Array.isArray(sorter) ? sorter[0] : sorter;
    const sorterField = sorterResult?.field as "orderDate" | "carPlate" | undefined;

    setSorter(
      sorterField && sorterResult?.order
        ? { field: sorterField, order: sorterResult.order === "ascend" ? "asc" : "desc" }
        : undefined
    );
    setFilters((prev) => ({
      orderStatus: prev?.orderStatus,
      batamProductionStatus:
        (tableFilters.batamProductionStatus as BatamProductionStatus[]) ?? undefined,
      sgProductionStatus: (tableFilters.sgProductionStatus as SgProductionStatus[]) ?? undefined,
      installationStatus: (tableFilters.installationStatus as InstallationStatus[]) ?? undefined,
    }));
    setPage(extra.action === "paginate" ? (paginationConfig.current ?? 1) : 1);
    setPageSize(paginationConfig.pageSize ?? pageSize);
  };

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
      sorter: true,
      render: (value) => formatDate(value),
    },
    {
      title: "Client",
      key: "client",
      render: (record) => (
        <Flex align="center" gap={4}>
          {record.client}
          {record.clientDetails && (
            <Tooltip title={record.clientDetails}>
              <InfoCircleOutlined />
            </Tooltip>
          )}
        </Flex>
      ),
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
      sorter: true,
    },
    {
      title: "Details",
      key: "details",
      render: (_, record: Order) => {
        const sortedItems = [...(record.orderItems ?? [])].sort((a, b) => {
          const aIsLeatherSeats = a.productType === LEATHER_SEATS_PRODUCT_TYPE_NAME;
          const bIsLeatherSeats = b.productType === LEATHER_SEATS_PRODUCT_TYPE_NAME;
          return Number(bIsLeatherSeats) - Number(aIsLeatherSeats);
        });

        return (
          <Typography.Text>
            <ul style={{ margin: 0 }}>
              {sortedItems.map((item) => (
                <li key={item.$id}>{renderOrderItemDetails(item)}</li>
              ))}
            </ul>
          </Typography.Text>
        );
      },
    },
    {
      title: "Batam Production",
      dataIndex: "batamProductionStatus",
      key: "batamProductionStatus",
      width: 150,
      filters: BatamProductionStatusMeta.options.map(({ value, label }) => ({
        text: label,
        value,
      })),
      render: (value: BatamProductionStatus | null) =>
        value ? <BatamProductionStatusTag status={value} /> : "-",
    },
    {
      title: "SG Production",
      dataIndex: "sgProductionStatus",
      key: "sgProductionStatus",
      width: 120,
      filters: SgProductionStatusMeta.options.map(({ value, label }) => ({ text: label, value })),
      render: (value: SgProductionStatus | null) =>
        value ? <SgProductionStatusTag status={value} /> : "-",
    },
    {
      title: "Installation",
      dataIndex: "installationStatus",
      key: "installationStatus",
      width: 100,
      filters: InstallationStatusMeta.options.map(({ value, label }) => ({ text: label, value })),
      render: (value: InstallationStatus | null) =>
        value ? <InstallationStatusTag status={value} /> : "-",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      fixed: "right",
      render: (_, record: Order) => {
        return (
          <Flex align="center" gap={4}>
            <Button type="text" icon={<EditOutlined />} />
            <UpdateOrderStatusButton record={record} />
          </Flex>
        );
      },
    },
  ];

  return (
    <Card size="small" variant="borderless">
      <Tabs
        activeKey={filters?.orderStatus}
        onChange={(key) => {
          setFilters((prev) => ({ ...prev, orderStatus: key as OrderStatus }));
          setPage(1);
        }}
        items={OrderStatusMeta.options.map((s) => ({
          key: s.value,
          label: s.label,
        }))}
      />
      <Table
        size="small"
        columns={columns}
        dataSource={orders?.rows}
        pagination={{
          current: page,
          pageSize,
          total: orders?.total,
          showTotal: (total) => `Total ${total} orders`,
        }}
        onChange={handleTableChange}
        rowKey="$id"
        scroll={{ x: "max-content" }}
      />
    </Card>
  );
};
