// es un servicio para comunicarte con un backend (Firebase) usando HttpClient
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  constructor(private httpClient: HttpClient) { }
}
