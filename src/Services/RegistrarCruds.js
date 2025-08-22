import { Api } from "./AxiosConfig";

export const RegistroProductosService = async (data) => {
    const response = await Api.post("/Productos/", data);
    return response.data;
}

export const RegistroCategoriaService = async (data) => {
    const response = await Api.post("/Categorias/", data);
    return response.data;
}

export const RegistroServicioService = async (data) => {
    const response = await Api.post("/Servicios/", data);
    return response.data;
}

export const RegistroClienteService = async (data) => {
    const response = await Api.post("/Clientes/", data);
    return response.data;
}

export const RegistroProveedorService = async (data) => {
    const response = await Api.post("/Proveedores/", data);
    return response.data;
}

export const RegistroRolService = async (data) => {
    const response = await Api.post("/Roles/", data);
    return response.data;
}

export const RegistroAdministradorService = async (data) => {
    const response = await Api.post("/Administradores/", data);
    return response.data;
}

