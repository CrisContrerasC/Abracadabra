/* 1. Crear un servidor con Express en el puerto 3000. */
import express from 'express';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const puerto = 3000;
app.listen ( puerto , ()=>console.log(`Servidor arriba en el puerto ${puerto}`))

/* 2.Definir la carpeta “assets” como carpeta pública del servidor.  */
app.use(express.static('assets'));
app.get('/', (req, res) => {

    console.log(res);
    res.sendFile(__dirname + '/index.html')
})

/* 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
la ruta /abracadabra/usuarios */

const usuarios = ["Francisca", "Martin", "Cristian", "Isabel", "Pablo"];

app.get("/abracadabra/usuarios", (req, res) => {
  res.json(usuarios);
});

/* 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en
el servidor.  */

app.use('/abracadabra/juego/:usuario', (req, res, next) => {
    const { usuario } = req.params;
    if (usuarios.map(u => u.trim().toLowerCase()).includes(usuario.trim().toLowerCase())) {
        // Si el usuario existe en el arreglo, pasa al siguiente middleware
        next();
    } else {
        // Si el usuario no existe, se envia un error 404
        res.sendFile(__dirname + '/assets/who.jpeg');
    }
});
// Ruta GET correspondiente
app.get('/abracadabra/juego/:usuario', (req, res) => {
    const { usuario } = req.params;
     
    res.send(`<h1><center>Hola ${usuario}!</h1>`);
});

/* 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
número generado de forma aleatoria.
En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
imagen de Voldemort. */

app.use('/abracadabra/conejo/:n', (req, res, next) =>{
    const n = parseInt(req.params.n);
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    if (n === randomNumber) {
      res.sendFile(__dirname + '/assets/conejito.jpg');
    } else {
      res.sendFile(__dirname + '/assets/voldemort.jpg');
    }
});

/* 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
consultar una ruta que no esté definida en el servidor. */
app.get('*', (req, res) => {
    res.send('<h1>Esta página no existe...</h1>')
  })