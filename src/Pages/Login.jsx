import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginUsuario } from "../Services/Auth";

export const Login = () => {
    const navigate = useNavigate();
        const [credentials, setCredentials] = useState({
        username: "",
        password: "" 
        });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Credenciales:", credentials);
            const response = await LoginUsuario(credentials);
            console.log(response);
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
            localStorage.setItem("is_superuser", response.is_superuser);
            localStorage.setItem("is_staff", response.is_staff);
            localStorage.setItem("username", response.username);
            localStorage.setItem("user", JSON.stringify(response))
            toast.success("sesion iniciada");
            navigate("/Dashboard"); 
            if (response.is_superuser || response.is_staff) {
                navigate("/Dashboard", {replace:true});
            }
            else {
                navigate("/LandingAutenticada", {replace:true});
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            toast.error("Credenciales incorrectas");
        }

    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
        <form 
            onSubmit={handleSubmit} 
            className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
        >
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
            🔐 Iniciar Sesión
            </h2>

            <div className="relative mb-4">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">👤</span>
            <input 
                name="username" 
                placeholder="Usuario" 
                onChange={handleChange} 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            </div>

            <div className="relative mb-6">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔑</span>
            <input 
                type="password" 
                name="password" 
                placeholder="Contraseña" 
                onChange={handleChange} 
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
            </div>

            <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition transform hover:scale-105"
            >
            🚀 Ingresar
            </button>
        </form>
    </div>

  );
}