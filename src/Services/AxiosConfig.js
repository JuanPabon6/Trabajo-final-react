import axios from "axios";

export const Api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");
        const publicEndpoints = [
            "/Clientes/",
            "/Proveedores/",
            "/token/",
            "/Productos/",
            "/Categorias/",]
        if (!publicEndpoints.includes(config.url)) {
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    })