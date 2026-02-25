import { EventEmitter, Injectable } from '@angular/core';
import { Producto } from './producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Variable para el ID siguiente y unico
  private idSiguiente = 1;

  productos: Producto[] = [];

  constructor(){
    // Inicializamos los productos
    this.inicializarProductos();
  }
  
  private inicializarProductos(){
    const producto1 = new Producto(this.idSiguiente++, 'Pantalón', 130.0);
    const producto2 = new Producto(this.idSiguiente++, 'Camisa', 80.0);
    const producto3 = new Producto(this.idSiguiente++, 'Playera', 50.0);    
    // Agregamos al arreglo de productos
    this.productos.push(producto1, producto2, producto3);
  }  

  agregarProducto(producto: Producto) { 
    this.productos.push(producto); 
  } 

  // Ese método es clave para buscar un producto por su id
  // Qué significa:
  // 👉 Busca en el array productos el producto cuyo id coincida con el parámetro recibido.
  // 👉 Si lo encuentra → devuelve el producto.
  // 👉 Si no lo encuentra → devuelve undefined.

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(producto => producto.id === id);
  }

}
