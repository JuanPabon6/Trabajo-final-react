import { Api } from "./AxiosConfig";

export const RegistroUsuario = async (data) => {
    const response = await Api.post("/Clientes/", data);
    return response.data;
}

export const RegistroProveedorService = async (data) => {
    const response = await Api.post("/Proveedores/", data);
    return response.data;
}

export const LoginUsuario = async (credenciales) => {
    const response = await Api.post("/login/", credenciales );
    return response.data;
}

export const CerrarSesion = async (Refreshtoken) => {
    const response = await Api.post("/logout/", {refresh: Refreshtoken})
    return response.data
}