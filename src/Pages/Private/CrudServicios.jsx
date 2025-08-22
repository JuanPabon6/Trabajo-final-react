import React from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { TraerServiciosService } from "../../Services/TraerCruds";
import { RegistroServicioService } from "../../Services/RegistrarCruds";
import { ActualizarServicioService } from "../../Services/ActualizarCruds";
import { EliminarServicioService } from "../../Services/EliminarCruds";

export const CrudServicios = () => {
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        NameServicio: "",
        DescriptionServicio: "",
        PriceServicio: 0
    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        Servicios();
    }, []);

    const Servicios = async () => {
        try {
            const servicios = await TraerServiciosService();
            setServicios(servicios || []);
            console.log("Servicios:", servicios);
        } catch (error) {
            toast.error("Error al cargar los servicios");
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
                await ActualizarServicioService(isEditing, formData);
                toast.success("Servicio actualizado correctamente");
            } else {
                await RegistroServicioService(formData);
                toast.success("Servicio registrado correctamente");
            }
            setFormData({ NameServicio: "", DescriptionServicio: "", PriceServicio: 0 });
            setIsEditing(null);
            Servicios();
        } catch (error) {
            console.error("Error al registrar/actualizar el servicio:", error);
            toast.error("Error al registrar/actualizar el servicio");
            console.error("Error al registrar/actualizar el servicio:", error);
        }
    };

    const handleEdit = (servicio) => {
        setFormData({
            NameServicio: servicio.NameServicio || "",
            DescriptionServicio: servicio.DescriptionServicio || "",
            PriceServicio: servicio.PriceServicio || 0
        });
        setIsEditing(servicio.IdServicio);
    };

    const handleDelete = async (id) => {
        try {
            await EliminarServicioService(id);
            toast.success("Servicio eliminado correctamente");
            Servicios();
        } catch (error) {
            toast.error("Error al eliminar el servicio");
            console.error("Error al eliminar el servicio:", error);
        }
    }

    const handleCancel = () => {
        setFormData({ NameServicio: "", DescriptionServicio: "", PriceServicio: 0 });
        setIsEditing(null);
    };

    return (
    <div>
      <h1 className="text-center text-3xl font-bold text-gray-900">Gestión de Servicios</h1>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-gray-800">
          {isEditing ? "Editar servicio" : "Registrar servicio"}
        </h3>

        <input
          type="text"
          name="NameServicio"
          placeholder="Nombre del servicio"
          value={formData.NameServicio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="PriceServicio"
          placeholder="Precio del servicio"
          value={formData.PriceServicio}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="DescriptionServicio"
          placeholder="Descripción (opcional)"
          value={formData.DescriptionServicio}
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
        {servicios.map((servicio) => (
          <div 
            key={servicio.IdServicio} 
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-2"
          >
            <h4 className="text-lg font-semibold text-gray-800">{servicio.NameServicio}</h4>
            <p className="text-gray-600">Precio: <span className="font-bold">${servicio.PriceServicio}</span></p>
            {servicio.DescriptionServicio && (
              <p className="text-sm text-gray-500">{servicio.DescriptionServicio}</p>
            )}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(servicio)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(servicio.IdServicio)}
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