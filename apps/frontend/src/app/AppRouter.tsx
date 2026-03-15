import React from "react";
import { Navigate, Route, Routes } from "react-router";

import { DashboardLayout } from "../components/DashboardLayout";
import { Login } from "./routes/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PurchaseOrders } from "./routes/PurchaseOrders";
import { Invoices } from "./routes/Invoices";
import { NewOrder } from "./routes/NewOrder";
import { Configurations } from "./routes/Configurations";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<PurchaseOrders />} />
          <Route path="new-order" element={<NewOrder />} />
          <Route path="five-star-auto-leather-invoices" element={<Invoices />} />
          <Route path="leather-and-stitch-invoices" element={<Invoices />} />
          <Route path="configurations" element={<Configurations />} />
        </Route>
      </Route>

      {/* Public routes */}
      <Route path="login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
