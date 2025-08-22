import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const RutaProtegida = ({ children }) => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/Login", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>
}