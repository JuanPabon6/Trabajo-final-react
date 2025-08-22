import React from "react";
import { useState } from "react";
import { RegistroUsuario } from "../Services/Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const RegistroCliente = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        NameCliente: "",
        EmailCliente: "",
        PhoneCliente: "",
        RoleCliente: "Cliente"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                user:{
                    username: formData.username,
                    password: formData.password
                },
                NameCliente: formData.NameCliente,
                EmailCliente: formData.EmailCliente,
                PhoneCliente: formData.PhoneCliente,
                RoleCliente: formData.RoleCliente
            };
            console.log("Payload:", payload);
            const response = await RegistroUsuario(payload);
            console.log("Usuario registrado:", response);
            toast.success("Usuario registrado con éxito");
            navigate("/Login");
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            toast.error("Error al registrar el usuario");
        }
    }
    return(
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4 mt-18">
  <form 
    onSubmit={handleSubmit} 
    className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200"
  >
    <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
      Nuevo Cliente📦
    </h2>

    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">👤</span>
      <input
        name="username"
        placeholder="Usuario"
        onChange={handleChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔑</span>
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={handleChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">📛</span>
      <input
        name="NameCliente"
        placeholder="Nombre"
        onChange={handleChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="relative mb-4">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">📧</span>
      <input
        name="EmailCliente"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <div className="relative mb-6">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">📱</span>
      <input
        name="PhoneCliente"
        placeholder="Teléfono"
        onChange={handleChange}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition transform hover:scale-105"
    >
      🚀 Registrarme
    </button>

    <button
      onClick={() => navigate("/Register")}
      type="button"
      className="w-full mt-3 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 hover:opacity-90 transition transform hover:scale-105"
    >
      ⬅️ Volver
    </button>
  </form>
</div>

    )
}