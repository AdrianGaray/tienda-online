import { Component } from '@angular/core';
import { Producto } from '../producto/producto.model';
import { ProductoService } from '../producto.service'; 
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  productoId: number | null = null;
  descripcionInput: string = ''; 
  precioInput: number | null = null; 

  constructor(private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
   ){}

  ngOnInit(){
    // Verificamos si debemos cargar un producto ya existente
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      const producto = this.productoService.getProductoById(Number(id));
      if(producto){
        // Si encontramos el producto lo cargamos en el formulario
        this.productoId = producto.id;
        this.descripcionInput = producto.descripcion;
        this.precioInput = producto.precio;
      }
    }
  }

   guardarProducto(evento: Event){
    evento.preventDefault();
    
    //Validar que sean valores correcto
    if(this.descripcionInput.trim() === '' 
      || this.precioInput == null || this.precioInput <=0){
      console.log('Debe ingresar una descripción y un precio válidos');
      return;
    }

    const producto = new Producto(this.productoId, this.descripcionInput, this.precioInput);

    // Agregamos el nuevo producto usando el servicio
    this.productoService.guardarProducto(producto);

    // Limpiamos los campos del formulario
    this.limpiarFormulario();

    // Redirigir al inicio
    this.router.navigate(['/']);

  }

    cancelar(){
    // Redirigimos al inicio
    this.router.navigate(['/']);
  }

  eliminarProducto(){
    if(this.productoId !== null){
      this.productoService.eliminarProducto(this.productoId);
      this.limpiarFormulario();
      this.router.navigate(['/']);
    }
  }
  
  limpiarFormulario(){
    this.productoId = null;
    this.descripcionInput = '';
    this.precioInput = null;
  }  

}
