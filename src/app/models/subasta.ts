import { LoginUsuario } from "./login-usuario";
import { Message } from "./message";
import { Producto } from "./producto";

export class Subasta {
    id: number;
    subastador: LoginUsuario;
    producto: Producto;
    precioInicial: number;
    estado: boolean;
    cantidadDeOfertantes: number;
    oferentes: LoginUsuario[];
    precioFinal: number;
    ganador: LoginUsuario;
    messageList: Message[];
  
    constructor(
      subastador: LoginUsuario,
      producto: Producto,
      precioInicial: number,
      estado: boolean,
      cantidadDeOfertantes: number,
      
    ) {
      this.subastador = subastador;
      this.producto = producto;
      this.precioInicial = precioInicial;
      this.estado = estado;
      this.cantidadDeOfertantes = cantidadDeOfertantes;
      this.oferentes = [];

    }
    
    
    addMessage(message: Message) {
      this.messageList.push(message);
    }
  }
