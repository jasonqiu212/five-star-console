import React, { useState } from "react";
import { Flex, Table, Tooltip } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Invoice, InvoiceEntity, InvoiceStatus, InvoiceStatusMeta } from "shared-types";
import { formatCurrency, formatDate } from "@/shared/utils";
import { useListInvoices } from "@/features/invoices/hooks/invoice.hooks";
import { InfoCircleOutlined } from "@ant-design/icons";
import { InvoiceStatusTag } from "@/components/tags/InvoiceStatusTag";

interface InvoicesTableProps {
  entity: InvoiceEntity;
}

export const InvoicesTable: React.FC<InvoicesTableProps> = ({ entity }) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sorter, setSorter] = useState<{ field: "openDate" | "carPlate"; order: "asc" | "desc" }>();
  const [status, setStatus] = useState<InvoiceStatus[]>();

  const { data: invoices } = useListInvoices({
    pagination: { limit: pageSize, offset: (page - 1) * pageSize },
    sorter,
    filters: { invoiceEntity: entity, status },
  });

  const handleTableChange: TableProps<Invoice>["onChange"] = (
    paginationConfig,
    tableFilters,
    tableSorter,
    extra
  ) => {
    const sorterResult = Array.isArray(tableSorter) ? tableSorter[0] : tableSorter;
    const sorterField = sorterResult?.field as "openDate" | "carPlate" | undefined;

    setSorter(
      sorterField && sorterResult?.order
        ? { field: sorterField, order: sorterResult.order === "ascend" ? "asc" : "desc" }
        : undefined
    );
    setStatus((tableFilters.status as InvoiceStatus[]) ?? undefined);
    setPage(extra.action === "paginate" ? (paginationConfig.current ?? 1) : 1);
    setPageSize(paginationConfig.pageSize ?? pageSize);
  };

  const columns: ColumnsType<Invoice> = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      width: 140,
    },
    {
      title: "Open Date",
      dataIndex: "openDate",
      key: "openDate",
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
      title: "Car Plate",
      dataIndex: "carPlate",
      key: "carPlate",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: InvoiceStatusMeta.options.map(({ value, label }) => ({ text: label, value })),
      render: (value: InvoiceStatus) => <InvoiceStatusTag status={value} />,
    },
    {
      title: "Total (Incl. Tax)",
      dataIndex: "totalInclTax",
      key: "totalInclTax",
      width: 140,
      render: (value: number) => formatCurrency(value),
    },
    {
      title: "Paid Date",
      dataIndex: "paidDate",
      key: "paidDate",
      width: 120,
      render: (value) => formatDate(value),
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={invoices?.rows}
      pagination={{
        current: page,
        pageSize,
        total: invoices?.total,
        showTotal: (total) => `Total ${total} invoices`,
      }}
      onChange={handleTableChange}
      rowKey="$id"
      scroll={{ x: "max-content" }}
    />
  );
};
