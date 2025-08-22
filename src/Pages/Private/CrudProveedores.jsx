import React from "react";
import { toast } from "react-toastify";
import { TraerProveedoresService } from "../../Services/TraerCruds";
import { RegistroProveedorService } from "../../Services/RegistrarCruds";
import { ActualizarProveedorService } from "../../Services/ActualizarCruds";
import { EliminarProveedorService } from "../../Services/EliminarCruds";
import { useState, useEffect } from "react";

export const CrudProveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        NameProveedor: "",
        EmailProveedor: "",
        PhoneProveedor: ""
    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        Proveedores();
    }, []);

    const Proveedores = async () => {
        try {
            const proveedores = await TraerProveedoresService();
            setProveedores(proveedores || []);
            console.log("Proveedores:", proveedores);
        } catch (error) {
            toast.error("Error al cargar los proveedores");
            console.error("Error al cargar los proveedores:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                user: {
                    username: formData.username,
                    password: formData.password,
                },
                NameProveedor: formData.NameProveedor,
                EmailProveedor: formData.EmailProveedor,
                PhoneProveedor: formData.PhoneProveedor,
            };
            if (isEditing) {
                await ActualizarProveedorService(isEditing, payload);
                toast.success("Proveedor actualizado correctamente");
            } else {
                await RegistroProveedorService(payload);
                toast.success("Proveedor registrado correctamente");
            }
            setFormData({ username: "", password: "", NameProveedor: "", EmailProveedor: "", PhoneProveedor: "" });
            setIsEditing(null);
            Proveedores();
        } catch (error) {
            console.error("Error al registrar/actualizar el proveedor:", error);
            toast.error("Error al registrar/actualizar el proveedor");
        }
    };

    const handleEdit = (proveedor) => {
        setFormData({
            user: {
                username: proveedor.user?.username || "",
                password: proveedor.user?.password || ""
            },
            NameProveedor: proveedor.NameProveedor || "",
            EmailProveedor: proveedor.EmailProveedor || "",
            PhoneProveedor: proveedor.PhoneProveedor || ""
        });
        setIsEditing(proveedor.IdProveedor);
    };

    const handleDelete = async (id) => {
        try {
            await EliminarProveedorService(id);
            toast.success("Proveedor eliminado correctamente");
            Proveedores();
        } catch (error) {
            toast.error("Error al eliminar el proveedor");
            console.error("Error al eliminar el proveedor:", error);
        }
    }

    const handleCancel = () => {
        setFormData({ username: "", password: "", NameProveedor: "", EmailProveedor: "", PhoneProveedor: "" });
        setIsEditing(null);
    };

  return (
<div className="p-6 space-y-6">
  <h2 className="text-2xl font-bold mb-4 text-center">
    {isEditing ? "Editar Proveedor" : "Registrar Proveedor"}
  </h2>

  <form
    onSubmit={handleSubmit}
    className="space-y-4 bg-white shadow-lg rounded-2xl p-6"
  >
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Usuario"
      className="w-full border rounded-lg px-3 py-2"
      required={!isEditing}
    />

    <input
      type="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      placeholder="Contraseña"
      className="w-full border rounded-lg px-3 py-2"
      required={!isEditing}
    />

    <input
      type="text"
      name="NameProveedor"
      value={formData.NameProveedor}
      onChange={handleChange}
      placeholder="Nombre del Proveedor"
      className="w-full border rounded-lg px-3 py-2"
      required
    />

    <input
      type="email"
      name="EmailProveedor"
      value={formData.EmailProveedor}
      onChange={handleChange}
      placeholder="Correo"
      className="w-full border rounded-lg px-3 py-2"
      required
    />

    <input
      type="text"
      name="PhoneProveedor"
      value={formData.PhoneProveedor}
      onChange={handleChange}
      placeholder="Teléfono"
      className="w-full border rounded-lg px-3 py-2"
      required
    />

    <div className="flex gap-4">
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        {isEditing ? "Actualizar" : "Registrar"}
      </button>
      {isEditing && (
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Cancelar
        </button>
      )}
    </div>
  </form>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Usuario</th>
          <th className="px-4 py-2 text-left">Nombre</th>
          <th className="px-4 py-2 text-left">Correo</th>
          <th className="px-4 py-2 text-left">Teléfono</th>
          <th className="px-4 py-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.length > 0 ? (
          proveedores.map((proveedor) => (
            <tr key={proveedor.IdProveedor} className="border-t">
              <td className="px-4 py-2">{proveedor.user?.username}</td>
              <td className="px-4 py-2">{proveedor.NameProveedor}</td>
              <td className="px-4 py-2">{proveedor.EmailProveedor}</td>
              <td className="px-4 py-2">{proveedor.PhoneProveedor}</td>
              <td className="px-4 py-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(proveedor)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(proveedor.IdProveedor)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
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
              className="text-center px-4 py-4 text-gray-500"
            >
              No hay proveedores registrados
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
}