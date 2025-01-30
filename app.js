import express from 'express';

const app = express();

// primera ruta api
app.get('/',(req, res) => {
    res.send(' !aqui se inica el proyecto¡');
});


//iniciar servidor 
const PORT =process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto http://localhost:3000');
});