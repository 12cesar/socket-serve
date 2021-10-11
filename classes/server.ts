import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import router from '../routes/router';
import cors from 'cors';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {
    private static _intance: Server
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private constructor() {
        
        this.app = express();
        
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = require('socket.io')(this.httpServer,{
            cors: {
                origin: true,
                credentials: true
              },            
          });
        this.escucharSockets();
        this.midlewares();
        this.routes();
        
        
    }

    public static get instance(){
        return this._intance || (this._intance=new this());
    }

    private escucharSockets(){
        
        this.io.on('connection', cliente =>{
            //mostrar el id
            //console.log(cliente.id);
            //Conectar cliente
            socket.conectarCliente(cliente);
            //Configurar usaurio
            socket.configurarUsuario(cliente, this.io)
            //mensajes
            socket.mensaje(cliente, this.io);
            // Desconectar
            socket.desconectar(cliente);
            
        });
    }

    midlewares() {
        this.app.use(cors({origin:true, credentials:true}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
    routes(){
        this.app.use('/', router);
    }
    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}