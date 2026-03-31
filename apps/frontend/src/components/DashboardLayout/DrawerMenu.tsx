import React from "react";
import { Drawer, Menu } from "antd";
import { useLocation, useNavigate } from "react-router";
import { SIDEBAR_MENU_ITEMS } from "./constants";

export interface DrawerMenuProps {
  open: boolean;
  onClose: () => void;
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    onClose();
  };

  return (
    <Drawer
      title={null}
      placement="left"
      open={open}
      onClose={onClose}
      size={280}
      closable
      mask
      styles={{
        body: { padding: "16px 12px" },
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={SIDEBAR_MENU_ITEMS}
        onClick={handleMenuClick}
        style={{ border: 0 }}
        defaultOpenKeys={SIDEBAR_MENU_ITEMS.map((item) => item?.key as string)}
      />
    </Drawer>
  );
};
