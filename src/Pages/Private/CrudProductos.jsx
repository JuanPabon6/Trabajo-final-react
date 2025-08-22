import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TraerProductosService } from "../../Services/TraerCruds"; 
import { TraerCategoriasService } from "../../Services/TraerCruds";
import { RegistroProductosService } from "../../Services/RegistrarCruds"; 
import { ActualizarProductoService } from "../../Services/ActualizarCruds";
import { EliminarProductoService } from "../../Services/EliminarCruds";

export const CrudProductos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    NameProducto: "",
    PriceProducto: 0,
    CategoryId: 0,
    ImageUrl: ""
  });
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    Productos();
    Categorias();
  }, []);

  const Productos = async () => {
    try {
      const productos = await TraerProductosService();
      setProductos(productos || []);
      console.log("Productos:", productos);
    } catch (error) {
      toast.error("Error al cargar los productos");
    }
  };

  const Categorias = async () => {
    try {
      const categorias = await TraerCategoriasService();
      setCategorias(categorias || []);
      console.log("Categorías:", categorias);
    } catch (error) {
      toast.error("Error al cargar las categorías");
    }
  };

    const handleChange = (e) => {
        const value =
        e.target.name === "CategoryId" || e.target.name === "PriceProducto"
            ? parseFloat(e.target.value)
            : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const dataToSend = {
        ...formData,
        PriceProducto: parseFloat(formData.PriceProducto) || 0,
        CategoryId: parseInt(formData.CategoryId) || 1
        };

        console.log("Datos a enviar:", dataToSend);

        if (isEditing) {
        await ActualizarProductoService(isEditing, dataToSend);
        toast.success("Producto actualizado correctamente");
        } else {
        await RegistroProductosService(dataToSend);
        toast.success("Producto registrado correctamente");
        }

        setFormData({ NameProducto: "", PriceProducto: 0, CategoryId: 0, ImageUrl: "" });
        setIsEditing(null);
        Productos();
    } catch (error) {
        toast.error("Error al guardar el producto");
    }
    };

  const handleEdit = (producto) => {
    setFormData({
      NameProducto: producto.NameProducto || "",
      PriceProducto: parseFloat(producto.PriceProducto) || 0,
      CategoryId: producto.CategoryId?.id || producto.CategoryId || 1,
      ImageUrl: producto.ImageUrl || ""
    });
    console.log("Editando producto:", producto);
    setIsEditing(producto.IdProducto);
  };

  const handleDelete = async (id) => {
    try {
      await EliminarProductoService(id);
      toast.success("Producto eliminado correctamente");
      Productos();
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <div>
      <h1 className="text-center text-gray-900 font-bold text-2xl ">Gestión de Productos</h1>

    <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-xl shadow-md mb-8 space-y-4 max-w-md mx-auto"
        >
        <h3 className="text-lg font-bold text-gray-800">
            {isEditing ? "Editar producto" : "Registrar producto"}
        </h3>

        <input
            type="text"
            name="NameProducto"
            placeholder="Nombre"
            value={formData.NameProducto}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
            type="number"
            name="PriceProducto"
            placeholder="Precio"
            value={formData.PriceProducto}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
            name="CategoryId"
            value={formData.CategoryId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
            <option value={0}>Seleccione categoría</option>
            {categorias.map((categoria) => (
            <option key={categoria.IdCategoria} value={categoria.IdCategoria}>
                {categoria.NameCategoria}
            </option>
            ))}
        </select>

        <input
            type="text"
            name="ImageUrl"
            placeholder="URL de la imagen"
            value={formData.ImageUrl}
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
                onClick={() => {
                    setIsEditing(null);
                    setFormData({
                        NameProducto: "",
                        PriceProducto: 0,
                        CategoryId: 0,
                        ImageUrl: ""
                    });
                }}
                className="w-full mt-2 bg-red-400 hover:bg-red-500 text-white py-2 rounded-lg transition-colors"
            >
                Cancelar
            </button>
        )}
    </form>

    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {productos.map((prod) => (
            <div 
            key={prod.IdProducto} 
            className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center space-y-2"
            >
            {prod.ImageUrl && (
                <img
                src={prod.ImageUrl}
                alt={prod.NameProducto}
                className="w-32 h-32 object-cover rounded-lg"
                />
            )}
            <h4 className="text-lg font-semibold text-gray-800">{prod.NameProducto}</h4>
            <p className="text-gray-600">Precio: <span className="font-bold">${prod.PriceProducto}</span></p>
            <p className="text-sm text-gray-500">
                Categoría:{ categorias.find(c => c.IdCategoria === prod.CategoryId)?.NameCategoria || "Sin categoría"}
            </p>
            <div className="flex gap-3 mt-3">
                <button
                onClick={() => handleEdit(prod)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-white"
                >
                Editar
                </button>
                <button
                onClick={() => handleDelete(prod.IdProducto)}
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