import { CarBrandsModelsTable } from "@/features/configurations/components/CarBrandsModelsTable";
import { ClientsTable } from "@/features/configurations/components/ClientsTable";
import { ProductTypesTable } from "@/features/configurations/components/ProductTypesTable";
import { Collapse } from "antd";
import React from "react";

export const Configurations: React.FC = () => {
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

  return <Collapse items={collapseItems} styles={{ body: { padding: 12 } }} />;
};
