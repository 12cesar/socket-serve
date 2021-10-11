import { Usuario } from './usuario';
export class UsuariosLista {

    private lista: Usuario[]=[];

    constructor(){}
    //agregar usuario
    public agregar(usuario:Usuario){
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    //actualizar usuario
    public actualizarNombre(id:string, nombre:string){
        for(let usuario of this.lista){
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario');
        console.log(this.lista);
        
        
    }
    //mostrar usuarios
    public getLista (){
        return this.lista.filter(usuario=> usuario.nombre != 'sin-nombre');
    }
    // mostrar unico usuario
    public getUsuario(id:string){
        return this.lista.find(usuario=>usuario.id === id );
    }
    //Obtener usuarios en un a sala particular
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario=> usuario.sala === sala)
    }
    //Borrar usuario
    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista= this.lista.filter(usuario=> usuario.id !== id);
        console.log(this.lista);
        
        return tempUsuario;
    }
}