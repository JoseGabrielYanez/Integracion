const express = require('express');
const rutas = express.Router();
const controlador = require('../controlador/controlador');

rutas.get('/', controlador.list);

module.exports = rutas;