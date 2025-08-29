import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const attachToken = (getToken: () => string | null) => {
    api.interceptors.request.use((config) => {
        const t = getToken();
        if (t) config.headers.Authorization = `Bearer ${t}`;
        return config;
    });
};

export default api;
