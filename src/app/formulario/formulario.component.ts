import { Component } from '@angular/core';
import { Producto } from '../producto/producto.model';
import { ProductoService } from '../producto.service'; 
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  imports: [FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  descripcionInput: string = ''; 
  precioInput: number | null = null; 

  constructor(private productoService: ProductoService,
    private router: Router
   ){}

   guardarProducto(evento: Event){
    evento.preventDefault();
    
    //Validar que sean valores correcto
    if(this.descripcionInput.trim() === '' 
      || this.precioInput == null || this.precioInput <=0){
      console.log('Debe ingresar una descripción y un precio válidos');
      return;
    }

    const producto = new Producto(this.descripcionInput, this.precioInput);

    // Agregamos el nuevo producto usando el servicio
    this.productoService.agregarProducto(producto);

    // Limpiamos los campos del formulario
    this.descripcionInput = '';
    this.precioInput = null;

    // Redirigir al inicio
    this.router.navigate(['/']);

  }

    cancelar(){
    // Redirigimos al inicio
    this.router.navigate(['/']);
  }

}
