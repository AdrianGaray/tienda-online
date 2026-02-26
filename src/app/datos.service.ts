// es un servicio para comunicarte con un backend (Firebase) usando HttpClient
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto/producto.model';
import { LoginService } from './login.service';

// Este servicio es singleton global
// * Se crea una sola instancia
// * Disponible en toda la app
// * No hace falta registrarlo manualmente
@Injectable({
  providedIn: 'root'
})
export class DatosService {

  // Es la URL base de Firebase
  url = 'https://tienda-online-91451-default-rtdb.firebaseio.com/';

  // Constructor con inyección
  // Angular inyecta automáticamente HttpClient
  constructor(private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  // Metodo: listarProductos()
  // 👉 Hace un GET HTTP a Firebase
  // 👉 Trae los productos guardados
  // 👉 Devuelve un Observable (respuesta async)
  // 👉 Los datos vienen como objeto clave-valor

  // 1️⃣ Tipo de retorno:  Observable<{[llave:string]: Producto}>
  // Esto significa:
  // * Devuelve un Observable (respuesta async de Angular)
  // * El contenido es un objeto donde:
  //    ** la clave (llave) es un string (ID generado por Firebase)
  //    ** el valor es un Producto
  // ⚠️ Firebase NO devuelve array, devuelve objeto.
  listarProductos(): Observable<{[llave:string]: Producto}>{
    const token = this.loginService.getIdToken();
    const url_listar = `${this.url}datos.json?auth=${token}`;

    return this.httpClient.get<{[llave:string]: Producto}>(url_listar);
  }  

  // 🔄 Flujo real
  /*
    Componente llama listarProductos()
            ↓
    DatosService hace HTTP GET
            ↓
    Firebase devuelve JSON
            ↓
    Angular lo envuelve en Observable
            ↓
    subscribe() recibe los datos
  */

  agregarProducto(producto: Producto): Observable<any>{
    const token = this.loginService.getIdToken();
    // Aqui se genera el valor de la llave de manera automatica
    const url_agregar = `${this.url}datos.json?auth=${token}`;
    return this.httpClient.post(url_agregar, producto);
  }    

  modificarProducto(producto: Producto, llave: string): Observable<any>{
    const token = this.loginService.getIdToken();
    const url_modificar = `${this.url}datos/${llave}.json?auth=${token}`;
    return this.httpClient.put(url_modificar, producto);
  }  

  eliminarProducto(llave: string): Observable<any>{
    const token = this.loginService.getIdToken();
    const url_eliminar = `${this.url}datos/${llave}.json?auth=${token}`;
    return this.httpClient.delete(url_eliminar);
  }  

}
