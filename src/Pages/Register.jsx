import React from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const  navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-white to-green-400">
        <div className="text-3xl font-bold mb-6 text-gray-800">
          <div className="space-y-4">
              <button
              onClick={() => navigate("/RegistroCliente")}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-transform hover:scale-105"
              >
              Registrate como Cliente📦
              </button>
              <button
              onClick={() => navigate("/RegistroProveedor")}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition transform hover:scale-105"
              >
              Registrate como Proveedor🏢
              </button>
          </div>
        </div>
    </div>
    </>
  );
}