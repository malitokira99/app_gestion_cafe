import {Router} from 'express';
export const lotesRouter = Router();

lotesRouterRouter.post('/',(req, res) => {
    const datos = req.body;
    console.log(datos);

    let nombre_lotel = datos.nombre_lote;
    let area_lotel = datos.area_lote;
    let tipo_cultivol = datos.tipo_cultivo;
    let variedadl = datos.variedad;
    let densidad_siembral = datos.densidad_siembra;
    let fecha_siembral = datos.fecha_siembra;

    let registrar = "INSERT INTO lotes (nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra) VALUES ('" + nombre_lotel + "','" + area_lotel + "','" + tipo_cultivol + "','" + variedadl + "' ,'" + densidad_siembral + "', '" + fecha_siembral + "')";

    conexion.query(registrar, function (error) {
        if (error) {
            console.error("Error al almacenar los datos:", error);
            res.status(500).send("Error al almacenar los datos");
        } else {
            console.log("Datos almacenados correctamente");
            res.status(201).redirect("/lotes");
        }
    });
});
lotesRouter.put('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const id = req.params.id;
    const { nombre_lote, area_lote, tipo_cultivo, variedad, densidad_siembra, fecha_siembra } = req.body;
  
    let campos = [];
    if (nombre_lote) campos.push(`nombre_lote = '${nombre_lote}'`);
    if (area_lote) campos.push(`area_lote = ${area_lote}`);
    if (tipo_cultivo) campos.push(`tipo_cultivo = '${tipo_cultivo}'`);
    if (variedad) campos.push(`variedad = '${variedad}'`);
    if (densidad_siembra) campos.push(`densidad_siembra = ${densidad_siembra}`);
    if (fecha_siembra) campos.push(`fecha_siembra = '${fecha_siembra}'`);
  
    if (campos.length === 0) {
      return res.status(400).send('No se proporcionaron campos para actualizar');
    }
  
    const sql = `UPDATE lotes SET ${campos.join(', ')} WHERE id = ${id}`;
    conexion.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send('Error al actualizar el lote');
      }
      res.send('Lote actualizado exitosamente');
    });
});
lotesRouter.get('/', (req, res) => {
    conexion.query('SELECT id, nombre_lote FROM lotes', (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
lotesRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('ID no válido');
    }
    conexion.query('DELETE FROM lotes WHERE id = ?', [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el registro');
            throw error;
        }
        res.send('Registro eliminado correctamente');
    }); 
});