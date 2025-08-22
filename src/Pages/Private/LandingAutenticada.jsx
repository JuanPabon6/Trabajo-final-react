import React from "react";
import { useState, useEffect } from "react";
import { TraerCategoriasService, TraerProductosService } from "../../Services/TraerCruds";
import { toast } from "react-toastify";

export const LandingAutenticada = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [CategoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [infoUsuario, setInfoUsuario] = useState({});
    
    useEffect(() => {
        Productos();
        Categorias();
        const userData = localStorage.getItem("user");

        if (userData) {
            const parseo = JSON.parse(userData);
            setInfoUsuario(parseo);
        }
    }, []);
    
    const Productos = async () => {
        try {
        const productos = await TraerProductosService();
        setProductos(productos || []);
        console.log("Productos:", productos);
        } catch (error) {
        toast.error("Error al cargar los productos");
        console.error("Error al cargar los productos:", error);
        }
    };
    
    const Categorias = async () => {
        try {
        const categorias = await TraerCategoriasService();
        setCategorias(categorias || []);
        console.log("Categorías:", categorias);
        } catch (error) {
        toast.error("Error al cargar las categorías");
        console.error("Error al cargar las categorías:", error);
        }
    };

    const FiltrarProductos = CategoriaSeleccionada ? productos.filter(producto => producto.CategoryId === CategoriaSeleccionada) : productos;

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 mt-18">
  {/* Cliente */}
  {infoUsuario.role === "cliente" && (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        👤 Cliente
      </h3>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Nombre:</span> {infoUsuario.username}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {infoUsuario.cliente.email}
        </p>
      </div>
    </div>
  )}

  {/* Proveedor */}
  {infoUsuario.role === "proveedor" && (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        🏢 Proveedor
      </h3>
      <div className="space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Nombre:</span> {infoUsuario.username}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Email:</span> {infoUsuario.proveedor.email}
        </p>
      </div>
    </div>
  )}

  <div className="container mx-auto px-6 py-10">
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center text-center justify-center gap-2 ">
        🗂️ Categorías
      </h2>
      <div className="flex gap-3 flex-wrap">
        <button
          className={`px-5 py-2 rounded-xl shadow-md transition font-medium ${
            !CategoriaSeleccionada
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-blue-100"
          }`}
          onClick={() => setCategoriaSeleccionada(null)}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.IdCategoria}
            className={`px-5 py-2 rounded-xl shadow-md transition font-medium ${
              CategoriaSeleccionada === cat.IdCategoria
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-blue-100"
            }`}
            onClick={() => setCategoriaSeleccionada(cat.IdCategoria)}
          >
            {cat.NameCategoria}
          </button>
        ))}
      </div>
    </section>

    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center text-center justify-center gap-2">
        🛒 Productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {FiltrarProductos.map((prod) => (
          <div
            key={prod.IdProducto}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center transition hover:shadow-xl hover:scale-105"
          >
            <img
              src={prod.ImageUrl || "https://via.placeholder.com/150"}
              alt={prod.NameProducto}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              {prod.NameProducto}
            </h3>
            <p className="text-gray-600 font-medium">💲 {prod.PriceProducto}</p>
            <p className="text-sm text-gray-500 mt-1">
              📂 {prod.CategoryId.NameCategoria || "Sin categoría"}
            </p>
          </div>
        ))}
      </div>
    </section>
  </div>
</div>

    )
}