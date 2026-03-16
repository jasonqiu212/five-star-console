import {
  useCreateCarBrand,
  useDeleteCarBrand,
  useListCarBrands,
  useUpdateCarBrand,
} from "@/hooks/api/useCarBrand";
import { CarBrand, CarModel } from "@/types/appwrite";
import { Flex, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddDropdownOptionButton } from "../AddDropdownOptionButton";
import { DeleteDropdownOptionButton } from "../DeleteDropdownOptionButton";
import { EditDropdownOptionButton } from "../EditDropdownOptionButton";
import { AddCarModelButton } from "./AddCarModelButton";
import { useDeleteCarModel, useUpdateCarModel } from "@/hooks/api/useCarModel";

export const CarBrandsModelsTable: React.FC = () => {
  const { data: carBrandsData, isFetching } = useListCarBrands();

  const createCarBrandMutation = useCreateCarBrand();
  const updateCarBrandMutation = useUpdateCarBrand();
  const deleteCarBrandMutation = useDeleteCarBrand();

  const updateCarModelMutation = useUpdateCarModel();
  const deleteCarModelMutation = useDeleteCarModel();

  const carBrands = useMemo(() => {
    return carBrandsData?.rows;
  }, [carBrandsData]);

  const columns: ColumnsType<CarBrand> = [
    {
      title: "Car Brand",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size={4}>
          <AddCarModelButton id={record.$id} />
          <EditDropdownOptionButton
            record={record}
            modalTitle="Edit car brand"
            inputPlaceholder="Car brand name"
            onSubmit={(values) =>
              updateCarBrandMutation.mutateAsync({ id: record.$id, payload: values })
            }
            isPending={updateCarBrandMutation.isPending}
          />
          <DeleteDropdownOptionButton
            title="Delete Car Brand"
            description="Are you sure you want to delete this car brand?"
            onConfirm={() => deleteCarBrandMutation.mutateAsync(record.$id)}
            isPending={deleteCarBrandMutation.isPending}
          />
        </Space>
      ),
    },
  ];

  const expandedRowRender = (record: CarBrand) => {
    const models: CarModel[] = record.carModels ?? [];

    const modelColumns: ColumnsType<CarModel> = [
      { title: "Car Model", dataIndex: "name", key: "name" },
      {
        title: "Actions",
        key: "actions",
        width: 100,
        render: (_, record) => (
          <Space size={4}>
            <EditDropdownOptionButton
              record={record}
              modalTitle="Edit Car Model"
              inputPlaceholder="Car model name"
              onSubmit={(values) =>
                updateCarModelMutation.mutateAsync({ id: record.$id, payload: values })
              }
              isPending={updateCarModelMutation.isPending}
            />
            <DeleteDropdownOptionButton
              title="Delete Car Model"
              description="Are you sure you want to delete this car model?"
              onConfirm={() => deleteCarModelMutation.mutateAsync(record.$id)}
              isPending={deleteCarModelMutation.isPending}
            />
          </Space>
        ),
      },
    ];
    return (
      <Table
        columns={modelColumns}
        dataSource={models}
        rowKey="$id"
        size="small"
        pagination={false}
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
            await createCarBrandMutation.mutateAsync(values);
          }}
          isPending={createCarBrandMutation.isPending}
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
