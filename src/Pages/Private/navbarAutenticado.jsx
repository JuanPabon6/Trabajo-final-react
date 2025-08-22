import React from "react";
import { Link } from "react-router-dom";
import { Salir } from "../../components/logout";

export const NavbarAutenticado = ({children}) =>{
    return(
        <>
            <nav className="bg-black text-white px-8 py-4 flex justify-between items-center fixed top-0 w-full z-50 shadow-lg">
                <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Jp Productos</div>
                    <Salir/>
                    <Link to="/ProductosAutenticado" className="text-gray-300 hover:text-white px-3 py-2">📦Productos</Link>
                </div>
            </nav>
            <main>{children}</main>
        </>
    )
}