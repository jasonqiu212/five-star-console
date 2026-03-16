import {
  useCreateProductType,
  useDeleteProductType,
  useListProductTypes,
  useUpdateProductType,
} from "@/hooks/api/useProductType";
import { ProductType } from "@/types/appwrite";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddDropdownOptionButton } from "../AddDropdownOptionButton";
import { EditDropdownOptionButton } from "../EditDropdownOptionButton";

export const ProductTypesTable: React.FC = () => {
  const { data: productTypesData, isFetching } = useListProductTypes();

  const createMutation = useCreateProductType();
  const deleteMutation = useDeleteProductType();
  const updateMutation = useUpdateProductType();

  const productTypes = useMemo(() => {
    return productTypesData?.rows;
  }, [productTypesData]);

  const handleDeleteConfirm = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const columns: ColumnsType<ProductType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => {
        if (record.isSystem) {
          return null;
        }

        return (
          <Space size={4}>
            <EditDropdownOptionButton
              record={record}
              modalTitle="Edit Product Type"
              inputPlaceholder="Product type name"
              onSubmit={(values) => updateMutation.mutateAsync({ id: record.$id, payload: values })}
              isPending={updateMutation.isPending}
            />
            <Popconfirm
              title="Delete product type"
              description="Are you sure you want to delete this product type?"
              onConfirm={() => handleDeleteConfirm(record.$id)}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button type="link" danger icon={<DeleteOutlined />} aria-label="Delete" />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Space vertical size="small" style={{ width: "100%" }}>
      <Flex justify="end">
        <AddDropdownOptionButton
          buttonLabel="Add Product Type"
          modalTitle="Add Product Type"
          inputPlaceholder="Product type name"
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
          }}
          isPending={createMutation.isPending}
        />
      </Flex>
      <Table
        columns={columns}
        dataSource={productTypes}
        loading={isFetching}
        rowKey="$id"
        size="small"
        sticky
        pagination={false}
      />
    </Space>
  );
};
