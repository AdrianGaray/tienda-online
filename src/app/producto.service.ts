import { EventEmitter, Injectable } from '@angular/core';
import { Producto } from './producto/producto.model';
import { DatosService } from './datos.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Se paso de un “traigo y muestro” a un modelo reactivo: 
// el servicio mantiene el estado y notifica a los componentes cuando hay cambios (con Subject + Subscription)
export class ProductoService {

  // Diccionario con claves únicas generadas por Firebase 
  // Guarda en el service la “foto actual” de los productos (como vienen de Firebase: objeto/diccionario).
  productos: {[llave:string]: Producto} = {}; // (estado en memoria)

  // Observable para notificar cambios
  // Un Subject es un Observable que también puede emitir valores.
  // * Los componentes hacen .subscribe(...) para “escuchar”.
  // * El service hace .next(...) para “avisar” que cambió la lista.  
  productosActualizados = new Subject<{[llave:string]: Producto}>(); // (canal de eventos)

  constructor(private datosService: DatosService){}
  
  listarProductos(){
    return this.datosService.listarProductos();
  }

  // Agregar o Modificar un producto existente
  guardarProducto(producto: Producto, llave: string | null = null) {
    if(llave === null){
      // Caso agregar
      // Llama a Firebase para guardar.
      // Cuando Firebase responde OK (subscribe), llama a refrescarProductos() para traer la lista de nuevo.
      this.datosService.agregarProducto(producto).subscribe(() => {
        this.refrescarProductos();
      });
    }else{ // Caso actualizar
      this.datosService.modificarProducto(producto, llave).subscribe(() => {
        this.refrescarProductos();
      });
    }
  }

  // Vuelve a pedir todo a Firebase y actualiza el estado del service
  private refrescarProductos(){
    this.listarProductos().subscribe((productos: {[llave:string]: Producto}) => {
      this.setProductos(productos);
    });
  } 

  // 1. Actualiza el estado local del service (this.productos)
  // 2. Emite el nuevo estado a todos los suscriptores con: this.productosActualizados.next(...)
  // ✅ Así cualquier componente que esté escuchando se actualiza solo.
  setProductos(productos: {[llave:string]: Producto}){
    this.productos = productos;
    this.productosActualizados.next(this.productos); // emitir la actualizacion de la lista
  }  

  // Ese método es clave para buscar un producto por su id
  // Qué significa:
  // 👉 Busca en el array productos el producto cuyo id coincida con el parámetro recibido.
  // 👉 Si lo encuentra → devuelve el producto.
  // 👉 Si no lo encuentra → devuelve undefined.

  getProductoByLlave(llave: string): Producto | undefined {
    return this.productos[llave];
  }

  eliminarProducto(llave: string){
   this.datosService.eliminarProducto(llave).subscribe(()=>{
    this.refrescarProductos();
   });
  }  

}
