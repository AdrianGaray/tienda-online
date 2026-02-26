import { Component } from '@angular/core';
import { ProductoComponent } from "../producto/producto.component";
import { Producto } from '../producto/producto.model';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from "../formulario/formulario.component";
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado-productos',
  imports: [ProductoComponent, FormsModule, FormularioComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

  // Diccionario con claves únicas generadas por Firebase 
  productos: { [llave: string]: Producto } = {};

  // Guarda la suscripción para poder cerrarla luego y evitar fugas de memoria.
  productosSubscripcion: Subscription | null = null;

  constructor(private productoService: ProductoService,
    private router: Router
  ) { }


  // ngOnInit() carga estado y escucha eventos
  // 1. Carga inicial desde Firebase (una vez).
  // 2. Se queda escuchando cambios emitidos por el service (para que si alguien agrega un producto, el listado se actualice sin recargar manualmente).
  ngOnInit(): void {
    this.cargarProductos();

    // Escuchamos los cambios en la lista de productos
    this.productosSubscripcion = this.productoService.productosActualizados.subscribe((productos) => {
     this.productos = productos;
    });    
  }

  // 🔎 ¿Qué hace?
  // 1️⃣ Llama al servicio: this.productoService.listarProductos()
  // 2️⃣ Ese servicio hace un GET a Firebase
  // 3️⃣ .subscribe() espera la respuesta (porque es Observable)
  // 4️⃣ Cuando Firebase responde, guarda los datos en: this.productos, para mostrar
  // lo carga desde la base de datos
  // 5 y además llama setProductos(productos) para que el service:
  //  * guarde el estado
  //  * y emita a productosActualizados
  cargarProductos() {
    this.productoService.listarProductos().subscribe((productos: { [llave: string]: Producto }) => {
      this.productos = productos;
      this.productoService.setProductos(productos);
    });
  }

  /*
    ngOnInit()
        ↓
    cargarProductos()
        ↓
    listarProductos() (HTTP GET)
        ↓
    Firebase responde
        ↓
    subscribe recibe datos
        ↓
    this.productos = respuesta
        ↓
    Angular actualiza la vista
  */

  // Firebase devuelve un objeto, no un array.
  // Object.keys(): Convierte el objeto en un array de claves.
  // Si this.productos es: { "-N1": Producto1, "-N2": Producto2}
  // Entonces:
  // Object.keys(this.productos) devuelve: ["-N1", "-N2"]
  obtenerLlaves(): string[]{
    if(this.productos){
      return Object.keys(this.productos);
    }
    return [];
  }  

  // Navegación a “agregar”
  // Cuando apretás el botón:
  // * Angular navega a la URL /agregar
  // * El Router carga el componente correspondiente (según app.routes.ts)
  agregarProducto() {
    this.router.navigate(['agregar']);
  }

  // ngOnDestroy() + unsubscribe()
  // Cuando salís de la pantalla (cambiás de ruta), el componente se destruye.
  ngOnDestroy(): void {
    if(this.productosSubscripcion != null){
      this.productosSubscripcion.unsubscribe();
    }
  }  

/*
Cómo se conecta todo (flujo real)
  Carga inicial:
    1. ListadoProductosComponent.ngOnInit()
    2. cargarProductos() → GET Firebase
    3. Llega respuesta → setProductos(productos)
    4. setProductos emite con next(...)
    5. El listado (que está suscripto) recibe y actualiza this.productos

Cuando agregás un producto (desde Formulario)
    1. ProductoService.guardarProducto(...)
    2. Firebase guarda → callback subscribe
    3. refrescarProductos() hace GET de nuevo
    4. setProductos(...) emite next(...)
    5. Listado se actualiza automáticamente
*/

/*
Observaciones importantes (para que lo tengas claro)
  ✅ 1) Subject vs EventEmitter
        * EventEmitter se usa más para comunicación hijo → padre en componentes.
        * Para servicios, es mejor Subject/BehaviorSubject.

*/

}
