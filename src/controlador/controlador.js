const control = {};
const oracledb = require('oracledb');
const consulta = `SELECT * FROM inscripcion`;
const validador = require('./validaciones');

// configuracion de base de datos
conf_conexion = {
    "user": "integracion",
    "password": "1234",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
};

//Obtener datos de la BD.
control.list = (req, res) => {
    oracledb.getConnection(conf_conexion, (err, connection) => {
        if (err) {
            // Error connecting to DB
            res.set('Content-Type', 'application/json');
            res.status(500).send(JSON.stringify({
                status: 500,
                message: "Error connecting to DB",
                detailed_message: err.message
            }));
            return;
        }
        // ejecutar consulta 
        connection.execute(consulta, [], (err, result) => {
            if (err) {
                console.error(err.message);
                return;
            }
            validador.validacion(result.metaData, result.rows);
            res.render('listado', {
                datos: result.metaData,
                data: result.rows
            });
        });
    });
};

//exportar modulos.
module.exports = control;