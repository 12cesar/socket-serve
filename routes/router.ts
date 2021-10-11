import {Router, Request, Response} from 'express';
import { Socket } from 'socket.io';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';



const router = Router();



router.get('/mensajes', (req:Request,res:Response)=>{
    res.json({
        ok:true,
        msg: 'Todo esta bien'
    })
})
router.post('/mensajes', (req:Request,res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const server = Server.instance;
    const payload = {
        de,
        cuerpo
    }
    server.io.emit('mensaje-nuevo', payload);
    
    res.json({
        ok:true,
        cuerpo,
        de
    })
})

router.post('/mensajes/:id', (req:Request,res:Response)=>{
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const {id} = req.params;
    const payload = {
        de,
        cuerpo
    }
    const server = Server.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
});

// Servicio para obtener todos los id de los usuarios
router.get('/usuarios', (req:Request, res:Response)=>{
    const server = Server.instance;
    server.io.fetchSockets().then((sockets)=>{
        res.json({
            ok:true,
            clientes:sockets.map(cliente=> cliente.id)
        })
    }).catch((err)=>{
        res.json({
            ok: false,
            err
        })
    })
})

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req:Request, res:Response)=>{
    
    //usuariosConectados
    res.json({
        ok:true,
        cliente:usuariosConectados.getLista()
    })
})

/* router.get('/usuarios',async (req: Request, res: Response) => {
    const server = Server.instance;
    await server.io.fetchSockets().then((sockets) => {
        res.json({
            ok: true,
            // clientes
            clientes: sockets.map( cliente => cliente.id)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        })
    });
}); */

export default router;