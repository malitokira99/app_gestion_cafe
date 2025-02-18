import express, {json} from 'express';
import cors from 'cors';
import {corsMidelware} from './middlewares/cors.js';
import {inicioRouter} from './routes/inicio-rute.js';
import {lotesRouter} from './routes/lotes-rutes.js';

const app = express();
app.use(json());
app.use(corsMidelware());

app.use('/datos', inicioRouter);
app.use('/lotes', lotesRouter);



// ruta para e inicio de a aplicacion
app.get('/datos/:mes',(req, res) => {
});
//ruta para lotes
app.post("/lotes", function(req, res) {
   });

//INICIO API EXPERIMENTAL
// Ruta para actualizar un registro parcial o totalmente
app.put('/lotes/:id', (req, res) => { 
});

//ruta para obtener lotes
app.get('/lotes', (req, res) => {
});
//ruta para eliminar lotes
app.delete('/lotes/:id', (req, res) => {   
});// fin ruta eliminar lotes
//iniciar servidor 
const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto http://localhost:3000');
});

