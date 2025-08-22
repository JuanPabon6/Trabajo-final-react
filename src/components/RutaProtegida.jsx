import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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