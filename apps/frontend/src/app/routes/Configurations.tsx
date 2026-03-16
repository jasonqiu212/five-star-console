import { CarBrandsModelsTable } from "@/features/configurations/components/CarBrandsModelsTable";
import { ClientsTable } from "@/features/configurations/components/ClientsTable";
import { NextNumberForm } from "@/features/configurations/components/NextNumberForm";
import { ProductTypesTable } from "@/features/configurations/components/ProductTypesTable";
import { useInvoiceNumberSequenceForm } from "@/features/configurations/hooks/useInvoiceNumberSequenceForm";
import { usePoNumberSequenceForm } from "@/features/configurations/hooks/usePoNumberSequenceForm";
import { Card, Collapse, Space, Typography } from "antd";
import React from "react";

export const Configurations: React.FC = () => {
  const {
    value: poNumberValue,
    isLoading: isLoadingPoNumberSequence,
    onUpdate: onUpdatePoNumberSequence,
    isUpdating: isUpdatingPoNumberSequence,
  } = usePoNumberSequenceForm();
  const {
    fiveStarAutoLeatherValue,
    leatherAndStitchValue,
    isLoading: isLoadingInvoiceNumberSequence,
    isUpdating: isUpdatingInvoiceNumberSequence,
    onUpdateFiveStarAutoLeather,
    onUpdateLeatherAndStitch,
  } = useInvoiceNumberSequenceForm();

  const collapseItems = [
    {
      key: "clients",
      label: "Clients",
      children: <ClientsTable />,
    },
    {
      key: "carBrandsModels",
      label: "Car Brands & Models",
      children: <CarBrandsModelsTable />,
    },
    {
      key: "productTypes",
      label: "Product Types",
      children: <ProductTypesTable />,
    },
  ];

  return (
    <Space vertical size="small" style={{ width: "100%" }}>
      <Card title="Next Invoice Number">
        <Space orientation="vertical" size="small">
          <Space>
            <Typography.Text>Five Star Auto Leather: </Typography.Text>
            <NextNumberForm
              value={fiveStarAutoLeatherValue}
              onUpdate={onUpdateFiveStarAutoLeather}
              isLoading={isLoadingInvoiceNumberSequence}
              isUpdating={isUpdatingInvoiceNumberSequence}
            />
          </Space>

          <Space>
            <Typography.Text>Leather & Stitch: </Typography.Text>
            <NextNumberForm
              value={leatherAndStitchValue}
              onUpdate={onUpdateLeatherAndStitch}
              isLoading={isLoadingInvoiceNumberSequence}
              isUpdating={isUpdatingInvoiceNumberSequence}
            />
          </Space>
        </Space>
      </Card>
      <Card title="Next PO Number">
        <NextNumberForm
          value={poNumberValue}
          onUpdate={onUpdatePoNumberSequence}
          isLoading={isLoadingPoNumberSequence}
          isUpdating={isUpdatingPoNumberSequence}
        />
      </Card>
      <Card title="Dropdown Options">
        <Collapse items={collapseItems} styles={{ body: { padding: 12 } }} />
      </Card>
    </Space>
  );
};
