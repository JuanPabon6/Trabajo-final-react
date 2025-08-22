import { Api } from "./AxiosConfig";

export const EliminarProductoService = async (id) => {
    const response = await Api.delete(`/Productos/${id}/`);
    return response.data;
}

export const EliminarCategoriaService = async (id) => {
    const response = await Api.delete(`/Categorias/${id}/`);
    return response.data;
}

export const EliminarServicioService = async (id) => {
    const response = await Api.delete(`/Servicios/${id}/`);
    return response.data;
}

export const EliminarClienteService = async (id) => {
    const response = await Api.delete(`/Clientes/${id}/`);
    return response.data;
}

export const EliminarProveedorService = async (id) => {
    const response = await Api.delete(`/Proveedores/${id}/`);
    return response.data;
}

export const EliminarRolService = async (id) => {
    const response = await Api.delete(`/Roles/${id}/`);
    return response.data;
}

export const EliminarAdministradorService = async (id) => {
    const response = await Api.delete(`/Administradores/${id}/`);
    return response.data;
}