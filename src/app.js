const express = require("express"),
    path = require('path');

const app = express();

//importaciones propias 
const rutas = require('./rutas/rutas');

//configuracion internas
app.set('port', process.env.PORT || 3000); // puerto.
app.set('view engine', 'ejs'); //  vistas.
app.set('views', path.join(__dirname, 'views')); //   rutas.

// config  rutas
app.use('/', rutas);

app.listen(app.get('port'), 'localhost', () => {
    console.log(`el puerto es ${app.get('port')}`);
})