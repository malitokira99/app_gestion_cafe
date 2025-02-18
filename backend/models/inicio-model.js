export class InicioModel {
    async obtenerDatosFinancieros(mes) {
        const query = 'SELECT * FROM datos_financieros WHERE mes = ?';
        const params = mes;
        return await this.conexion.ejecutarQuery(query, params);
    }
}