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
      key: "productTypes",
      label: "Product Types",
      children: <ProductTypesTable />,
    },
  ];

  return <Collapse items={collapseItems} />;
};
