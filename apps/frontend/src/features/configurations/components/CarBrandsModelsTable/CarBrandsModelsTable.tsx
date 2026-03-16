import {
  useCreateCarBrand,
  useDeleteCarBrand,
  useListCarBrands,
  useUpdateCarBrand,
} from "@/hooks/api/useCarBrand";
import { CarBrand, CarModel } from "@/types/appwrite";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddDropdownOptionButton } from "../AddDropdownOptionButton";
import { EditDropdownOptionButton } from "../EditDropdownOptionButton";

export const CarBrandsModelsTable: React.FC = () => {
  const { data: carBrandsData, isFetching } = useListCarBrands();

  const createMutation = useCreateCarBrand();
  const updateMutation = useUpdateCarBrand();
  const deleteMutation = useDeleteCarBrand();

  const carBrands = useMemo(() => {
    return carBrandsData?.rows;
  }, [carBrandsData]);

  const handleDeleteConfirm = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  };

  const columns: ColumnsType<CarBrand> = [
    {
      title: "Car Brand",
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
            modalTitle="Edit car brand"
            inputPlaceholder="Car brand name"
            onSubmit={(values) => updateMutation.mutateAsync({ id: record.$id, payload: values })}
            isPending={updateMutation.isPending}
          />
          <Popconfirm
            title="Delete car brand"
            description="Are you sure you want to delete this car brand?"
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

  const expandedRowRender = (record: CarBrand) => {
    const models: CarModel[] = record.carModels ?? [];

    const modelColumns: ColumnsType<CarModel> = [
      { title: "Car Model", dataIndex: "name", key: "name" },
    ];
    return (
      <Table
        columns={modelColumns}
        dataSource={models}
        rowKey="$id"
        size="small"
        pagination={false}
        showHeader
      />
    );
  };

  return (
    <Space vertical size="small" style={{ width: "100%" }}>
      <Flex justify="end">
        <AddDropdownOptionButton
          buttonLabel="Add Car Brand"
          modalTitle="Add car brand"
          inputPlaceholder="Car brand name"
          onSubmit={async (values) => {
            await createMutation.mutateAsync(values);
          }}
          isPending={createMutation.isPending}
        />
      </Flex>
      <Table
        columns={columns}
        dataSource={carBrands}
        loading={isFetching}
        rowKey="$id"
        size="small"
        sticky
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => (record.carModels?.length ?? 0) > 0,
          expandRowByClick: true,
        }}
      />
    </Space>
  );
};
