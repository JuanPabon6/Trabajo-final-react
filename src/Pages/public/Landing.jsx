import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TraerProductosService } from "../../Services/TraerCruds";
import { TraerCategoriasService } from "../../Services/TraerCruds";
import { Link } from "react-router-dom";

export const Landing = () => {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const imagenes = [
  "https://img.freepik.com/foto-gratis/arreglo-coleccion-estacionaria-moderna_23-2149309643.jpg?semt=ais_hybrid&w=740&q=80",
  "https://www.shutterstock.com/image-photo/set-modern-devices-on-dark-600nw-2562035367.jpg",
  "https://media.istockphoto.com/id/178716575/es/foto/dispositivos-m%C3%B3viles.jpg?s=612x612&w=0&k=20&c=ZgbYAK_Uz2X90Sc8F8-HPhKyaaHXIl3iTskwzVqgOTc=",
  "https://laportadacanada.com/userfiles/images/tecnologia.jpg",
  "https://www.thenocgroup.com/wp-content/uploads/2023/03/dispositivos_ectronicos_thenoc.jpg",
  "https://limpiezademalaga.es/wp-content/uploads/2020/07/GettyImages-513631128-compressed-1024x768.jpg",
  "https://media.istockphoto.com/id/1335669510/es/vector/conjunto-de-dispositivos-isom%C3%A9tricos-vectoriales.jpg?s=612x612&w=0&k=20&c=EaRYwxRxExo132lyu8aEy_Afy_sSTD6sYMBL_sTTcXc="
  ]

  useEffect(() => {
    Productos();
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 3000);

    return () => clearInterval(intervalo)
  }, []);
  
  const Productos = async () => {
      try {
        const productosData = await TraerProductosService();
        setProductos(productosData || []);
        console.log("Productos:", productosData);
      } catch (error) {
        toast.error("Error al cargar los productos");
        console.error("Error al cargar los productos:", error);
      }
    };

    
    return (
      <>
          <div className="container mx-auto px-6 py-10">
            <header className="h-[80vh] bg-cover bg-center flex items-center justify-center text-center text-white" >
                <div className="bg-black bg-opacity-50 p-10 rounded-xl">
                  <h2 className="text-5xl font-extrabold mb-6">Listo para ver los mejores aparatos electronicos!</h2>
                  <p className="mb-6 text-lg">Descubrelos aqui!</p>
                  <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition"><Link to="/Productos">Ultimos modelos!</Link></button>
                </div>
            </header>
            <div className="h-[80vh] flex flex-col items-center justify-center">
              <img src={imagenes[index]} alt="" className=" w-[70%] h-[80vh] object-contain rounded-lg shadow-lg transition-all duration-700" />
            </div>  
          </div>

          <section>
        <h2 className="text-2xl font-bold mb-4 flex text-center items-center justify-center">Nuestros productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((prod) => (
            <div
              key={prod.IdProducto}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center"
            >
              {/* Imagen */}
              <img
                src={prod.ImageUrl || "https://via.placeholder.com/150"}
                alt={prod.NameProducto}
                className="w-32 h-32 object-cover rounded-md mb-4"
              />
              {/* Info */}
              <h3 className="text-lg font-semibold">{prod.NameProducto}</h3>
              <p className="text-gray-600">💲 {prod.PriceProducto}</p>
            </div>
          ))}
        </div>
      </section>

      </>
    );
    }