import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { TraerRolesService } from "../../Services/TraerCruds";
import { RegistroRolService } from "../../Services/RegistrarCruds";
import { ActualizarRolService } from "../../Services/ActualizarCruds";
import { EliminarRolService } from "../../Services/EliminarCruds";

export const CrudRoles = () => {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        NameRol: ""
    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        Roles();
    }, []);

    const Roles = async () => {
        try {
            const roles = await TraerRolesService();
            setRoles(roles || []);
            console.log("Roles:", roles);
        } catch (error) {
            toast.error("Error al cargar los roles");
            console.error("Error al cargar los roles:", error);
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
            if (isEditing) {
                await ActualizarRolService(isEditing, formData);
                toast.success("Rol actualizado correctamente");
            } else {
                await RegistroRolService(formData);
                toast.success("Rol registrado correctamente");
            }
            setFormData({ NameRol: "" });
            setIsEditing(null);
            Roles();
        } catch (error) {
            console.error("Error al registrar/actualizar el rol:", error);
            toast.error("Error al registrar/actualizar el rol");
        }
    };

    const handleEdit = (rol) => {
        setFormData({
            NameRol: rol.NameRol || ""
        });
        setIsEditing(rol.IdRol);
    };

    const handleDelete = async (id) => {
        try {
            await EliminarRolService(id);
            toast.success("Rol eliminado correctamente");
            Roles();
        } catch (error) {
            console.error("Error al eliminar el rol:", error);
            toast.error("Error al eliminar el rol");
        }
    };

    const handleCancel = () => {
        setFormData({ NameRol: "" });
        setIsEditing(null);
    }
    return (
    <div>
      <h1 className="text-center text-gray-900 text-2xl font-bold">Gestión de Roles</h1>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-gray-800">
          {isEditing ? "Editar rol" : "Registrar rol"}
        </h3>

        <input
          type="text"
          name="NameRol"
          placeholder="Nombre del rol"
          value={formData.NameRol}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
        >
          {isEditing ? "Actualizar" : "Registrar"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
        )}
      </form>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((rol) => (
          <div 
            key={rol.IdRol} 
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-2"
          >
            <h4 className="text-lg font-semibold text-gray-800">{rol.NameRol}</h4>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(rol)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(rol.IdRol)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};