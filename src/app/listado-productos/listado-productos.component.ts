import { Component } from '@angular/core';
import { ProductoComponent } from "../producto/producto.component";
import { Producto } from '../producto/producto.model';
import { FormsModule } from '@angular/forms';
import { FormularioComponent } from "../formulario/formulario.component";
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-productos',
  imports: [ProductoComponent, FormsModule, FormularioComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {

  // Diccionario con claves únicas generadas por Firebase 
  productos: { [llave: string]: Producto } = {};

  constructor(private productoService: ProductoService,
    private router: Router
  ) { }


  // ngOnInit() carga estado y escucha eventos
  ngOnInit(): void {
    this.cargarProductos();
  }

  // 🔎 ¿Qué hace?
  // 1️⃣ Llama al servicio: this.productoService.listarProductos()
  // 2️⃣ Ese servicio hace un GET a Firebase
  // 3️⃣ .subscribe() espera la respuesta (porque es Observable)
  // 4️⃣ Cuando Firebase responde, guarda los datos en: this.productos
  // lo carga desde la base de datos
  cargarProductos() {
    this.productoService.listarProductos().subscribe((productos: { [llave: string]: Producto }) => {
      this.productos = productos;
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

}
