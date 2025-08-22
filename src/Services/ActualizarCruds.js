import { Api } from "./AxiosConfig";

export const ActualizarProductoService = async (id, data) => {
    const response = await Api.put(`/Productos/${id}/`, data);
    return response.data;
}

export const ActualizarCategoriaService = async (id, data) => {
    const response = await Api.put(`/Categorias/${id}/`, data);
    return response.data;
}

export const ActualizarServicioService = async (id, data) => {
    const response = await Api.put(`/Servicios/${id}/`, data);
    return response.data;
}

export const ActualizarClienteService = async (id, data) => {
    const response = await Api.put(`/Clientes/${id}/`, data);
    return response.data;
}

export const ActualizarProveedorService = async (id, data) => {
    const response = await Api.put(`/Proveedores/${id}/`, data);
    return response.data;
}

export const ActualizarRolService = async (id, data) => {
    const response = await Api.put(`/Roles/${id}/`, data);
    return response.data;
}

export const ActualizarAdministradorService = async (id, data) => {
    const response = await Api.put(`/Administradores/${id}/`, data);
    return response.data;
}