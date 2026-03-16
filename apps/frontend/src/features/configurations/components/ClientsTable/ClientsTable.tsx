import {
  useCreateClient,
  useDeleteClient,
  useListClients,
  useUpdateClient,
} from "@/hooks/api/useClient";
import { Client } from "@/types/appwrite";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddDropdownOptionButton } from "../AddDropdownOptionButton";
import { EditDropdownOptionButton } from "../EditDropdownOptionButton";

export const ClientsTable: React.FC = () => {
  const { data: clientsData, isFetching } = useListClients();

  const createMutation = useCreateClient();
  const updateMutation = useUpdateClient();
  const deleteMutation = useDeleteClient();

  const clients = useMemo(() => {
    return clientsData?.rows;
  }, [clientsData]);

  const handleDeleteConfirm = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const columns: ColumnsType<Client> = [
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
          <EditDropdownOptionButton
            record={record}
            modalTitle="Edit Client"
            inputPlaceholder="Client name"
            onSubmit={(values) => updateMutation.mutateAsync({ id: record.$id, payload: values })}
            isPending={updateMutation.isPending}
          />
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
        <AddDropdownOptionButton
          buttonLabel="Add Client"
          modalTitle="Add Client"
          inputPlaceholder="Client name"
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
          }}
          isPending={createMutation.isPending}
        />
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
