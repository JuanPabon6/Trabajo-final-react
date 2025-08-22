import React, { use } from "react";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { TraerCategoriasService } from "../../Services/TraerCruds";
import { RegistroCategoriaService } from "../../Services/RegistrarCruds";
import { ActualizarCategoriaService } from "../../Services/ActualizarCruds";
import { EliminarCategoriaService } from "../../Services/EliminarCruds";

export const CrudCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [formData, setFormData] = useState({
        NameCategoria: ""

    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        Categorias();
    }, []);

    const Categorias = async () => {
        try {
            const categorias = await TraerCategoriasService();
            setCategorias(categorias || []);
            console.log("Categorías:", categorias);
        } catch (error) {
            toast.error("Error al cargar las categorías");
        }
    }

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
                await ActualizarCategoriaService(isEditing, formData);
                toast.success("Categoría actualizada correctamente");
            } else {
                await RegistroCategoriaService(formData);
                toast.success("Categoría registrada correctamente");
            }
            setFormData({ NameCategoria: "" });
            setIsEditing(null);
            Categorias();
        } catch (error) {
            console.error("Error al registrar/actualizar la categoría:", error);
            toast.error("Error al registrar/actualizar la categoría");
        }
    }

    const handleEdit = (categoria) => {
        setFormData({
            NameCategoria: categoria.NameCategoria || ""
        });
        setIsEditing(categoria.IdCategoria);
    };

    const handleDelete = async (id) => {
        try {
            await EliminarCategoriaService(id);
            toast.success("Categoría eliminada correctamente");
            Categorias();
        } catch (error) {
            console.error("Error al eliminar la categoría:", error);
            toast.error("Error al eliminar la categoría");
        }
    }

    const handleCancel = () => {
        setFormData({ NameCategoria: "" });
        setIsEditing(null);
    };

    return (
    <div>
      <h1 className="text-center text-gray-900 font-bold text-2xl">Gestión de Categorías</h1>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4 max-w-md mx-auto"
      >
        <h3 className="text-lg font-bold text-gray-800">
          {isEditing ? "Editar categoría" : "Registrar categoría"}
        </h3>

        <input
          type="text"
          name="NameCategoria"
          placeholder="Nombre de la categoría"
          value={formData.NameCategoria}
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
        {categorias.map((cat) => (
          <div 
            key={cat.IdCategoria} 
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-2"
          >
            <h4 className="text-lg font-semibold text-gray-800">{cat.NameCategoria}</h4>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(cat)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(cat.IdCategoria)}
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
