import { Api } from "./AxiosConfig";

export const TraerProductosService = async () => {
    const response = await Api.get("/Productos/");
    return response.data;
}

export const TraerCategoriasService = async () => {
    const response = await Api.get("/Categorias/");
    return response.data;
}

export const TraerServiciosService = async () => {
    const response = await Api.get("/Servicios/");
    return response.data;
}

export const TraerClientesService = async () => {
    const response = await Api.get("/Clientes/");
    return response.data;
}

export const TraerProveedoresService = async () => {
    const response = await Api.get("/Proveedores/");
    return response.data;
}

export const TraerRolesService = async () => {
    const response = await Api.get("/Roles/");
    return response.data;
}

export const TraerAdministradoresService = async () => {
    const response = await Api.get("/Administradores/");
    return response.data;
}
