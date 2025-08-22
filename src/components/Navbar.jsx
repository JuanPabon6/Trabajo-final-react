import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Jp Productos</div>
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">🏡Inicio</Link>
            <Link to="/Productos" className="text-gray-300 hover:text-white px-3 py-2">📦Productos</Link>
            <Link to="/Register" className="text-gray-300 hover:text-white px-3 py-2">👤Registrate</Link>
            <Link to="/Login" className="text-gray-300 hover:text-white px-3 py-2">🔐Login</Link>
        </div>
    </nav>
  );
}