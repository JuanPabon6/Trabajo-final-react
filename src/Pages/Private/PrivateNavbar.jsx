import React from "react";
import { Link } from "react-router-dom";
import { Salir } from "../../components/logout";

export const PrivateNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">⚙️Administración</div>
        <div className="space-x-4">
          <Salir/>
          <Link to="/Dashboard" className="text-gray-300 hover:text-white">⚙️Dashboard</Link>
          <Link to="/CrudCategorias" className="text-gray-300 hover:text-white">📦Categorías</Link>
          <Link to="/CrudProductos" className="text-gray-300 hover:text-white">📂Productos</Link>
          <Link to="/CrudClientes" className="text-gray-300 hover:text-white">👤Clientes</Link>
          <Link to="/CrudProveedores" className="text-gray-300 hover:text-white">👥Proveedores</Link>
          <Link to="/CrudAdministradores" className="text-gray-300 hover:text-white">🥇Administradores</Link>
          <Link to="/CrudRoles" className="text-gray-300 hover:text-white">📑Roles</Link>
          <Link to="/CrudServicios" className="text-gray-300 hover:text-white">💵Servicios</Link>
        </div>
      </div>
    </nav>
  );
}