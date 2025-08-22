import React from "react";
import { replace, useNavigate } from "react-router-dom";
import { CerrarSesion } from "../Services/Auth";
import { toast } from "react-toastify";

export const Salir = () =>{
    const navigate = useNavigate()

    const handdleLogout = async () =>{
        const confirmar = window.confirm("Estas seguro que deseas cerrar sesion?")
        if (!confirmar) {
            return
        }
        const refreshToken = localStorage.getItem("refresh")

        try{
            if (refreshToken) {
                await CerrarSesion(refreshToken)
            }
        }catch(error){
            console.error("error al cerrar sesion", error)
            toast.error("error al cerrar sesion")
        }
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        navigate("/Login", {replace: true})

    }

    return(
         <button
            onClick={handdleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
            Cerrar sesión
        </button>
    )
}