const formatos = require('moment');
const csv = require('csv-stringify')
const fs = require('fs')

const validaciones = {};
const posiciones = [23, 14, 18, 19, 62, 67, 26, 68, 28, 10, 11, 81, 80, 6, 83, 30, 3, 4, 5, 48, 8, 2, 38, 39, 41, 42, 43, 46, 47, 13, 84, 12, 82];
let archivo = [];
let cuerpo = [];

validaciones.validacion = function(arregloHead, arregloBody) {

    for (f = 0; f < arregloBody.length; f++) {
        for (c = 0; c < posiciones.length; c++) {
            indice = posiciones[c];
            if (arregloHead[indice].name == "FECHA_NAC" || arregloHead[indice].name == "FECHA_ENTREGA" || arregloHead[indice].name == 'FECHA_FACT') {
                arregloBody[f][indice] = fecha(arregloBody[f][indice]);
            }
            cuerpo.push(arregloBody[f][indice]);
            if (!archivo.includes(arregloHead[indice].name))
                archivo.push(arregloHead[indice].name);
        }
    }
    formatoCsv(archivo, cuerpo);
};

function fecha(fechas) {
    if (fechas) {
        nuevo = formatos(fechas).format("YYYYMMDD");
    } else {
        nuevo = ""
    }
    return nuevo
}

function formatoCsv(header, datos) {
    input = [
        header,
        datos
    ]
    csv(input, function(err, output) {
        if (err) {
            console.log(err);
            return
        }
        CrearArchivo(output);
    });
}

function CrearArchivo(archivo) {
    fs.writeFile(`info.csv`, archivo, (err) => {
        if (err) console.log(err);
        console.log('archivo creado');
    })
}

module.exports = validaciones;