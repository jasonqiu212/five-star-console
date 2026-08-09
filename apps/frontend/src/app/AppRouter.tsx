import React from "react";
import { Navigate, Route, Routes } from "react-router";

import { DashboardLayout } from "../components/DashboardLayout";
import { Login } from "./routes/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PurchaseOrders } from "./routes/PurchaseOrders";
import { NewOrder } from "./routes/NewOrder";
import { Configurations } from "./routes/Configurations";
import { FiveStarAutoLeatherInvoices } from "./routes/FiveStarAutoLeatherInvoices";
import { LeatherAndStitchInvoices } from "./routes/LeatherAndStitchInvoices";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<PurchaseOrders />} />
          <Route path="new-order" element={<NewOrder />} />
          <Route path="five-star-auto-leather-invoices" element={<FiveStarAutoLeatherInvoices />} />
          <Route path="leather-and-stitch-invoices" element={<LeatherAndStitchInvoices />} />
          <Route path="configurations" element={<Configurations />} />
        </Route>
      </Route>

      {/* Public routes */}
      <Route path="login" element={<Login />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
