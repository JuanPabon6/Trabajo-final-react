import React from "react";
import { Routes, Route} from "react-router-dom";
import { Login } from "../Pages/Login";
import { RutaProtegida } from "../components/RutaProtegida";
import { Dashboard } from "../Pages/Private/Dashboard";
import { RegistroCliente } from "../Pages/RegistroCliente";
import { Register } from "../Pages/Register";
import { Landing } from "../Pages/public/Landing";
import { CrudClientes } from "../Pages/Private/CrudClientes";
import { CrudAdministradores } from "../Pages/Private/CrudAdministradores";
import { CrudCategorias } from "../Pages/Private/CrudCategorias";
import { CrudProductos } from "../Pages/Private/CrudProductos";
import { CrudProveedores } from "../Pages/Private/CrudProveedores";
import { CrudServicios } from "../Pages/Private/CrudServicios";
import { CrudRoles } from "../Pages/Private/CrudRoles";
import { PrivateNavbar } from "../Pages/Private/PrivateNavbar";
import { AdminLayout } from "../Pages/Private/AdminLayout";
import { PublicLayout } from "../Pages/public/PublicLayout";
import { RegistroProveedor } from "../Pages/RegistroProveedor";
import { LandingAutenticada } from "../Pages/Private/LandingAutenticada";
import { Productos } from "../components/Productos";
import { NavbarAutenticado } from "../Pages/Private/navbarAutenticado";
import { LoyoutAutenticado } from "../Pages/Private/loyoutAutenticado";
import { ProductosAutenticado } from "../Pages/Private/ProductosAutenticado";

export const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout><Landing/></PublicLayout>} />
            <Route path="/Login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/RegistroCliente" element={<PublicLayout><RegistroCliente/></PublicLayout>} />
            <Route path="/RegistroProveedor" element={<PublicLayout><RegistroProveedor/></PublicLayout>} />
            <Route path="/Register" element={<PublicLayout><Register/></PublicLayout>} />
            <Route path="/Dashboard" element={<RutaProtegida><AdminLayout><Dashboard /></AdminLayout></RutaProtegida>} />
            <Route path="/CrudClientes" element={<RutaProtegida><AdminLayout><CrudClientes/></AdminLayout></RutaProtegida>} />
            <Route path="/CrudAdministradores" element={<RutaProtegida><AdminLayout><CrudAdministradores/></AdminLayout></RutaProtegida>} />
            <Route path="/CrudCategorias" element={<RutaProtegida><AdminLayout><CrudCategorias /></AdminLayout></RutaProtegida>} />
            <Route path="/CrudProductos" element={<RutaProtegida><AdminLayout><CrudProductos /></AdminLayout></RutaProtegida>} />
            <Route path="/CrudProveedores" element={<RutaProtegida><AdminLayout><CrudProveedores /></AdminLayout></RutaProtegida>} />
            <Route path="/CrudServicios" element={<RutaProtegida><AdminLayout><CrudServicios /></AdminLayout></RutaProtegida>} />
            <Route path="/CrudRoles" element={<RutaProtegida><AdminLayout><CrudRoles /></AdminLayout></RutaProtegida>} />
            <Route path="/PrivateNavbar" element={<RutaProtegida><PrivateNavbar /></RutaProtegida>} />
            <Route path="/LandingAutenticada" element={<RutaProtegida><NavbarAutenticado><LandingAutenticada/></NavbarAutenticado></RutaProtegida>} />
            <Route path="/Productos" element={<PublicLayout><Productos/></PublicLayout>} />
            <Route path="/ProductosAutenticado" element={<LoyoutAutenticado><ProductosAutenticado/></LoyoutAutenticado>}/>
        </Routes>
    )
}