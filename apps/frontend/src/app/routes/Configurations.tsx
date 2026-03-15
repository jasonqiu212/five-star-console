import { ProductTypesTable } from "@/features/configurations/components/ProductTypesTable";
import { Collapse } from "antd";
import React from "react";

export const Configurations: React.FC = () => {
  const collapseItems = [
    {
      key: "productTypes",
      label: "Product Types",
      children: <ProductTypesTable />,
    },
  ];

  return <Collapse items={collapseItems} />;
};
