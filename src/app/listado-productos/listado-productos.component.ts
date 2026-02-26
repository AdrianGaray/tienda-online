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
  productos: {[llave:string]: Producto} = {};

  constructor(private productoService: ProductoService,
    private router: Router
  ) {} 


  // ngOnInit() carga estado y escucha eventos
  ngOnInit(): void { 
    this.cargarProductos();
  } 

  // lo carga desde la base de datos
  cargarProductos(){
    
  }

  // Navegación a “agregar”
  // Cuando apretás el botón:
  // * Angular navega a la URL /agregar
  // * El Router carga el componente correspondiente (según app.routes.ts)
  agregarProducto(){
    this.router.navigate(['agregar']);
  }

}
