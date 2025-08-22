import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TraerClientesService } from "../../Services/TraerCruds";
import { RegistroClienteService } from "../../Services/RegistrarCruds";
import { ActualizarClienteService } from "../../Services/ActualizarCruds";
import { EliminarClienteService } from "../../Services/EliminarCruds";

export const CrudClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        NameCliente: "",
        EmailCliente: "",
        PhoneCliente: "",
        RoleCliente: "Cliente"
    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        Clientes();
    }, []);

    const Clientes = async () => {
        try {
            const clientes = await TraerClientesService();
            setClientes(clientes || []);
            console.log("Clientes:", clientes);
        } catch (error) {
            toast.error("Error al cargar los clientes");
            console.error("Error al cargar los clientes:", error);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
                user: {
                    username: formData.username,
                    password: formData.password,
                },
                NameCliente: formData.NameCliente,
                EmailCliente: formData.EmailCliente,
                PhoneCliente: formData.PhoneCliente,
                RoleCliente: formData.RoleCliente,
            };
        if (isEditing) {
            await ActualizarClienteService(isEditing, payload);
            toast.success("Cliente actualizado correctamente");
        }else {
            await RegistroClienteService(payload);
            console.log("Cliente registrado:", payload)
            toast.success("Usuario registrado con éxito");
    }
        setFormData({
            username: "",
            password: "",
            NameCliente: "",
            EmailCliente: "",
            PhoneCliente: "",
            RoleCliente: "Cliente"
        });
        setIsEditing(null);
        Clientes();
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      console.log("Datos del formulario en error:", formData);
      toast.error("Error al registrar el usuario");
    }
    };

    const handleEdit = (cliente) => {
        setFormData({
            user: {
                username: cliente.user?.username || "",
                password: cliente.user?.password || ""
            },
            NameCliente: cliente.NameCliente || "",
            EmailCliente: cliente.EmailCliente || "",
            PhoneCliente: cliente.PhoneCliente || "",
            RoleCliente: cliente.RoleCliente || "Cliente"
        });
        setIsEditing(cliente.IdCliente);

    }

    const handleDelete = async (id) => {
        try {
            await EliminarClienteService(id);
            toast.success("Cliente eliminado correctamente");
            Clientes();
        } catch (error) {
            console.error("Error al eliminar el cliente:", error);
            toast.error("Error al eliminar el cliente");
        }
    }

    const handleCancel = () => {
        setFormData({ username:"", password:"", NameCliente: "", EmailCliente: "", PhoneCliente: "", RoleCliente: "Cliente" });
        setIsEditing(null);
    };
  return (
    <>
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isEditing ? "Editar Cliente" : "Registrar Cliente"}
      </h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-lg rounded-2xl p-6"
      >
        {!isEditing && (
          <>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Usuario"
              className="w-full border rounded-lg px-3 py-2"
            />
          </>
        )}

        <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="w-full border rounded-lg px-3 py-2"
            />
        <input
          type="text"
          name="NameCliente"
          value={formData.NameCliente}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="email"
          name="EmailCliente"
          value={formData.EmailCliente}
          onChange={handleChange}
          placeholder="Correo"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <input
          type="text"
          name="PhoneCliente"
          value={formData.PhoneCliente}
          onChange={handleChange}
          placeholder="Teléfono"
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            {isEditing ? "Actualizar Cliente" : "Registrar Cliente"}
          </button>

          {isEditing && (
            <button type="button"  onClick={handleCancel}  className="bg-red-400 px-4 py-2 rounded text-white">
                Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de clientes */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Lista de Clientes</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Correo</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Rol</th>
              <th className="p-2 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <tr key={cliente.IdCliente} className="hover:bg-gray-50">
                  <td className="p-2 border">{cliente.NameCliente}</td>
                  <td className="p-2 border">{cliente.EmailCliente}</td>
                  <td className="p-2 border">{cliente.PhoneCliente}</td>
                  <td className="p-2 border">{cliente.RoleCliente}</td>
                  <td className="p-2 border flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(cliente)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.IdCliente)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No hay clientes registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}