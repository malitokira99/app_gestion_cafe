import express from 'express';

const app = express();

// primera ruta api
app.get('/',(req, res) => {
    res.send(' !aqui se inica el proyecto¡');
});


//iniciar servidor 

app.listen(3000, () => {
    console.log('servidor corriendo en el puerto http://localhost:3000');
});