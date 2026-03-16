import React, { useMemo, useState } from "react";
import { Card, Input, Select, Space, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useListProductTypes } from "@/hooks/api/useProductType";

// Example row type
interface PurchaseOrderRow {
  key: string;
  poNumber: string;
  vendor: string;
  status: "Pending" | "Approved" | "Shipped" | "Cancelled";
  orderDate: string;
  amount: number;
}

// Example data
const EXAMPLE_DATA: PurchaseOrderRow[] = [
  {
    key: "1",
    poNumber: "PO-2024-001",
    vendor: "Acme Supplies",
    status: "Pending",
    orderDate: "2024-02-15",
    amount: 1250,
  },
  {
    key: "2",
    poNumber: "PO-2024-002",
    vendor: "Beta Corp",
    status: "Approved",
    orderDate: "2024-02-14",
    amount: 3400,
  },
  {
    key: "3",
    poNumber: "PO-2024-003",
    vendor: "Acme Supplies",
    status: "Shipped",
    orderDate: "2024-02-10",
    amount: 890,
  },
  {
    key: "4",
    poNumber: "PO-2024-004",
    vendor: "Gamma Inc",
    status: "Cancelled",
    orderDate: "2024-02-12",
    amount: 2100,
  },
  {
    key: "5",
    poNumber: "PO-2024-005",
    vendor: "Beta Corp",
    status: "Pending",
    orderDate: "2024-02-18",
    amount: 560,
  },
];

const STATUS_FILTER_ITEMS = [
  { text: "Pending", value: "Pending" },
  { text: "Approved", value: "Approved" },
  { text: "Shipped", value: "Shipped" },
  { text: "Cancelled", value: "Cancelled" },
];

export const PurchaseOrders: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data: productTypes } = useListProductTypes();
  console.log(productTypes);

  const filteredData = useMemo(() => {
    return EXAMPLE_DATA.filter((row) => {
      const matchesSearch =
        !searchText ||
        row.poNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        row.vendor.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = !statusFilter || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchText, statusFilter]);

  const columns: ColumnsType<PurchaseOrderRow> = [
    {
      title: "PO Number",
      dataIndex: "poNumber",
      key: "poNumber",
      sorter: (a, b) => a.poNumber.localeCompare(b.poNumber),
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      sorter: (a, b) => a.vendor.localeCompare(b.vendor),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: STATUS_FILTER_ITEMS,
      onFilter: (value, record) => record.status === value,
      render: (status: string) => (
        <Typography.Text
          type={status === "Cancelled" ? "danger" : status === "Shipped" ? "success" : undefined}
        >
          {status}
        </Typography.Text>
      ),
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      sorter: (a, b) => a.orderDate.localeCompare(b.orderDate),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      sorter: (a, b) => a.amount - b.amount,
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
  ];

  return (
    <Card size="small">
      <Space style={{ marginBottom: 16 }} wrap>
        <Input.Search
          placeholder="Search by PO number or vendor"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 260 }}
        />
        <Select
          placeholder="Filter by status"
          allowClear
          value={statusFilter ?? undefined}
          onChange={(v) => setStatusFilter(v ?? null)}
          style={{ width: 160 }}
          options={STATUS_FILTER_ITEMS.map(({ text, value }) => ({ label: text, value }))}
        />
      </Space>
      <Table
        size="small"
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 10 }}
      />
    </Card>
  );
};
