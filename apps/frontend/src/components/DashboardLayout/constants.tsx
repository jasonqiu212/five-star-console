import { DashboardOutlined, DollarOutlined, SettingOutlined } from "@ant-design/icons";

export const PAGE_TITLES: Record<string, string> = {
  "/": "Purchase Orders",
  "/new-order": "New Order",
  "/five-star-auto-leather-invoices": "Five Star Auto Leather Invoices",
  "/leather-and-stitch-invoices": "Leather & Stitch Invoices",
  "/configurations": "Configurations",
};

export const SIDEBAR_MENU_ITEMS = [
  {
    key: "/",
    icon: <DashboardOutlined />,
    label: "Purchase Orders",
  },
  {
    key: "/invoices",
    icon: <DollarOutlined />,
    label: "Invoices",
    children: [
      {
        key: "/five-star-auto-leather-invoices",
        label: "Five Star Auto Leather",
      },
      {
        key: "/leather-and-stitch-invoices",
        label: "Leather & Stitch",
      },
    ],
  },
  {
    key: "/configurations",
    icon: <SettingOutlined />,
    label: "Configurations",
  },
];
