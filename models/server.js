const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const hbs = require('hbs');
class Server {
    constructor(){
        this.app = express();
        this.server = require('http').createServer(this.app);

        // Cargar Middlewares
        this.middlewares();

        // Motor de plantilla
        this.viewEngine();
        
        // Conectarse a Mongo
        this.mongoConnection();

        // Cargar rutas
        this.routes();
    }
    async mongoConnection(){
        await mongoose.connect('mongodb+srv://usuario:1234@clusterlab7.teydf.mongodb.net/dbLab7?retryWrites=true&w=majority');
    }
    middlewares(){
        this.app.use(cors());
        this.app.use( express.static('public'));
        this.app.use(express.urlencoded({ extended: true }));
    }
    viewEngine(){
        this.app.set('view engine', 'hbs');
        hbs.registerPartials(__dirname + '/../views/partials', function (err) {});
        hbs.registerHelper('whichBody', function(vista) { return vista});
    }
    routes(){
        this.app.get('/', (req, res) => {
            res.render('layout', {vista: 'index'});
        });
        this.app.use('/rols', require('../routes/rolsRoute'));
        this.app.use('/users', require('../routes/usersRoute'));
    }
    listen() {
        this.server.listen( 3000, () => {
            console.log('Servidor corriendo en puerto', 3000 );
        });
    }
}
module.exports = Server;