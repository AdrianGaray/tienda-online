import { Component, Input } from '@angular/core';
import { Producto } from './producto.model';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto',
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input() producto!: Producto; 

  constructor(private productoService: ProductoService){}

  // Acá pasa esto:
  // * El componente no le avisa al padre directamente.
  // * En vez de eso, dispara un evento en el service: emit(producto).
  emitirDetalleProducto(){
    this.productoService.detalleProductoEmitter.emit(this.producto);
  }

}
