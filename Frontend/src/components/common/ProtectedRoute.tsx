import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
