import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import router from '../routes/router';
import cors from 'cors';

export default class Server {
    public app: express.Application;
    public port: number;


    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.midlewares();
        this.routes();
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
        this.app.listen(this.port, callback);
    }
}