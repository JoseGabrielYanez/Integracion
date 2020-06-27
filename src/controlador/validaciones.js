const formatos = require('moment'); // cambiar los formatos de las fechas
const fs = require('fs'); //  enviar el nombre del archivo
const csvWriter = require('csv-write-stream'); //  crear el archivo csv con arreglos - por index

const validaciones = {}; // metodo llamado desde controlador
// posiciones que deben mantenerse de los arreglos. 
const posiciones = [23, 14, 18, 19, 62, 67, 26, 68, 28, 10, 11, 81, 80, 6, 83, 30, 3, 4, 5, 48, 8, 2, 38, 39, 41, 42, 43, 46, 47, 13, 84, 12, 82];
let arregloCabeceras = [];
let arregloDatosLimpios = [];


validaciones.validacion = function(arregloHead, arregloBody) {

    for (f = 0; f < arregloBody.length; f++) {
        arregoPaso = []; // solo quedara con las posiciones deseadas.
        for (c = 0; c < posiciones.length; c++) {
            indice = posiciones[c];

            if (arregloHead[indice].name == "FECHA_NAC" || arregloHead[indice].name == "FECHA_ENTREGA" || arregloHead[indice].name == 'FECHA_FACT') {
                arregloBody[f][indice] = fecha(arregloBody[f][indice]); // llama a funcion fecha para cambio de formato
            }

            arregoPaso.push(arregloBody[f][indice]); // agrega una nueva posicion.

            if (!arregloCabeceras.includes(arregloHead[indice].name))
                arregloCabeceras.push(arregloHead[indice].name); // agrega los datos necearios y no repetidos para usarlas como cabecera.
        }
        arregloDatosLimpios.push(arregoPaso); // va guardando arreglo filtrado
    }
    formatoCsv(arregloCabeceras, arregloDatosLimpios); // funcion envia los 2 arreglos para generar el archivo CSV una vez filtrados
};

function fecha(fechas) {

    if (fechas) {
        nuevoFormato = formatos(fechas).format("YYYYMMDD");
    } else {
        nuevoFormato = "";
    }
    return nuevoFormato;
}

function formatoCsv(header, datos) {

    let writer = csvWriter({
        separador: ';',
        newline: '\n',
        headers: header,
        sendHeaders: true
    });
    writer.pipe(fs.createWriteStream('inscripcionCsv.csv')); // los datos se guardaran en este archivo

    for (i = 0; i < datos.length; i++) { // recorre el arreglo para agregar cada fila al archivo de extencion csv
        writer.write(datos[i]);
    }

    writer.end(); //cierra la edicion de archivo.

}


module.exports = validaciones;