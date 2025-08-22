import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TraerCategoriasService, TraerProductosService } from "../Services/TraerCruds";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    cargarProductos();
    cargarCategorias();
  }, []);

  const cargarProductos = async () => {
    try {
      const productosData = await TraerProductosService();
      setProductos(productosData || []);
      console.log("Productos:", productosData);
    } catch (error) {
      toast.error("Error al cargar los productos");
      console.error("Error al cargar los productos:", error);
    }
  };

  const cargarCategorias = async () => {
    try {
      const categoriasData = await TraerCategoriasService();
      setCategorias(categoriasData || []);
      console.log("Categorías:", categoriasData);
    } catch (error) {
      toast.error("Error al cargar las categorías");
      console.error("Error al cargar las categorías:", error);
    }
  };

  const productosFiltrados = categoriaSeleccionada
    ? productos.filter((producto) => producto.CategoryId === categoriaSeleccionada)
    : productos;

  return (
    <>
      <section className="mt-20 px-6">
  <h2 className="text-4xl font-extrabold mb-6 flex flex-col items-center text-gray-800 relative">
    Categorías de nuestros productos
    <span className="block w-24 h-1 bg-blue-500 mt-3 rounded-full"></span>
  </h2>

  <div className="flex gap-3 flex-wrap justify-center">
    <button
      className={`px-5 py-2 rounded-full border shadow-sm transition duration-300 flex items-center gap-2 ${
        !categoriaSeleccionada
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
      onClick={() => setCategoriaSeleccionada(null)}
    >
      🌐 Todas
    </button>
    {categorias.map((cat) => (
      <button
        key={cat.IdCategoria}
        className={`px-5 py-2 rounded-full border shadow-sm transition duration-300 flex items-center gap-2 ${
          categoriaSeleccionada === cat.IdCategoria
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setCategoriaSeleccionada(cat.IdCategoria)}
      >
        📦 {cat.NameCategoria}
      </button>
    ))}
  </div>
</section>

<section className="mt-16 px-6">
  <h2 className="text-4xl font-extrabold mb-6 flex flex-col items-center text-gray-800 relative">
    Productos
    <span className="block w-24 h-1 bg-blue-500 mt-3 rounded-full"></span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {productosFiltrados.map((prod) => (
      <div
        key={prod.IdProducto}
        className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col items-center text-center"
      >
        <img
          src={prod.ImageUrl || "https://via.placeholder.com/150"}
          alt={prod.NameProducto}
          className="w-40 h-40 object-contain transform hover:scale-110 transition duration-300 rounded-md mb-4"
        />

        <h3 className="mt-3 text-lg font-bold text-gray-800">{prod.NameProducto}</h3>
        <p className="text-green-600 font-semibold text-lg flex items-center gap-1">
          💲 {prod.PriceProducto}
        </p>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          🏷️ {prod.CategoryId?.NameCategoria || "Sin categoría"}
        </p>
      </div>
    ))}
  </div>
</section>
    </>
  );
};
