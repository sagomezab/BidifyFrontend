export class Producto {
    id?: number;
    nombre: string;
    precio: number;
    img: string;

    constructor(nombre: string, precio: number, img: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
    }
}


