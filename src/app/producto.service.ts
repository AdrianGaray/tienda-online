import { EventEmitter, Injectable } from '@angular/core';
import { Producto } from './producto/producto.model';
import { DatosService } from './datos.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productos: {[llave:string]: Producto} = {};

  constructor(private datosService: DatosService){}
  
  listarProductos(){
    return this.datosService.listarProductos();
  }

  // Agregar o Modificar un producto existente
  guardarProducto(producto: Producto, llave: string | null = null) {
    if(llave === null){
      // Caso agregar
      this.datosService.guardarProducto(producto).subscribe(() => {
        console.log(`Se agrego el nuevo producto: ${producto.descripcion} - ${producto.precio}`);
      });
    }
  }

  // Ese método es clave para buscar un producto por su id
  // Qué significa:
  // 👉 Busca en el array productos el producto cuyo id coincida con el parámetro recibido.
  // 👉 Si lo encuentra → devuelve el producto.
  // 👉 Si no lo encuentra → devuelve undefined.

  getProductoByLlave(llave: string): Producto | undefined {
    return undefined;
    //return this.productos.find(producto => producto.id === id);
  }

  eliminarProducto(id: number){
    // const indice = this.productos.findIndex(producto => producto.id === id);
    // if(indice !== -1){
    //   this.productos.splice(indice, 1);
    // }
  }

}
