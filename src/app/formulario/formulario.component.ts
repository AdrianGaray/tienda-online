import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Producto } from '../producto/producto.model';

@Component({
  selector: 'app-formulario',
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {


  @ViewChild('descripcionInput') descripcionInput!: ElementRef;
  @ViewChild('precioInput') precioInput!: ElementRef;
  @Output() nuevoProducto = new EventEmitter<Producto>();

  agregarProducto(evento: Event) {
    evento.preventDefault();

    // Validación simple para evitar productos sin descripción o con precio cero 
    if (this.descripcionInput.nativeElement.value.trim() === ''
      || this.precioInput.nativeElement.value == null || this.precioInput.nativeElement.value <= 0) {
      console.log('Debe ingresar una descripción y un precio válidos');
      return;
    }

    const producto = new Producto(this.descripcionInput.nativeElement.value, this.precioInput.nativeElement.value);

    //Emitir el evento de nuevo producto 
    this.nuevoProducto.emit(producto);

    // Limpia los campos de entrada después de agregar el producto 
    this.descripcionInput.nativeElement.value = '';
    this.precioInput.nativeElement.value = 0;
  }

}
