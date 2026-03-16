import { useDeleteClient, useListClients } from "@/hooks/api/useClients";
import { Clients } from "@/types/appwrite";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddClientButton } from "./AddClientButton";
import { EditClientButton } from "./EditClientButton";

export const ClientsTable: React.FC = () => {
  const { data: clientsData, isFetching } = useListClients();

  const deleteMutation = useDeleteClient();

  const clients = useMemo(() => {
    return clientsData?.rows;
  }, [clientsData]);

  const handleDeleteConfirm = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const columns: ColumnsType<Clients> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Space size={4}>
          <EditClientButton record={record} />
          <Popconfirm
            title="Delete client"
            description="Are you sure you want to delete this client?"
            onConfirm={() => handleDeleteConfirm(record.$id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <Button type="link" danger icon={<DeleteOutlined />} aria-label="Delete" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Space vertical size="small" style={{ width: "100%" }}>
      <Flex justify="end">
        <AddClientButton />
      </Flex>
      <Table
        columns={columns}
        dataSource={clients}
        loading={isFetching}
        rowKey="$id"
        size="small"
        sticky
      />
    </Space>
  );
};
