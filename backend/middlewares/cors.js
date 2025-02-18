import cors from 'cors';

export const corsMiddleware = () => cors({
    origin: '*', // Origen de la petición
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
});