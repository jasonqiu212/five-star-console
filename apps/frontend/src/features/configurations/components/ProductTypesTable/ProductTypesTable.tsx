import { useDeleteProductType, useListProductTypes } from "@/hooks/api/useProductType";
import { ProductTypes } from "@/types/appwrite";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddProductTypeButton } from "./AddProductTypeButton";
import { EditProductTypeButton } from "./EditProductTypeButton";

export const ProductTypesTable: React.FC = () => {
  const { data: productTypesData, isFetching } = useListProductTypes();

  const deleteMutation = useDeleteProductType();

  const productTypes = useMemo(() => {
    return productTypesData?.rows;
  }, [productTypesData]);

  const handleDeleteConfirm = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const columns: ColumnsType<ProductTypes> = [
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
            <EditProductTypeButton record={record} />
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
        <AddProductTypeButton />
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
