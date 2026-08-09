import { CarBrand } from "shared-types";
import { Flex, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useMemo } from "react";
import { AddDropdownOptionButton } from "../AddDropdownOptionButton";
import { DeleteDropdownOptionButton } from "../DeleteDropdownOptionButton";
import { EditDropdownOptionButton } from "../EditDropdownOptionButton";
import {
  useCreateCarBrand,
  useDeleteCarBrand,
  useListCarBrands,
  useUpdateCarBrand,
} from "../../hooks/car-brand.hooks";

export const CarBrandsTable: React.FC = () => {
  const { data: carBrandsData, isFetching } = useListCarBrands();

  const createCarBrandMutation = useCreateCarBrand();
  const updateCarBrandMutation = useUpdateCarBrand();
  const deleteCarBrandMutation = useDeleteCarBrand();

  const carBrands = useMemo(() => {
    return carBrandsData?.rows;
  }, [carBrandsData]);

  const columns: ColumnsType<CarBrand> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_, record) => (
        <Space size={4}>
          <EditDropdownOptionButton
            record={record}
            modalTitle="Edit car brand"
            inputPlaceholder="Car brand name"
            onSubmit={(values) => updateCarBrandMutation.mutateAsync({ id: record.$id, ...values })}
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
      />
    </Space>
  );
};
