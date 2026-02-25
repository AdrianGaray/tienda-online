// Este archivo main.ts es el punto de arranque de tu aplicación Angular.
// Es lo primero que se ejecuta cuando la app inicia.

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

// 1️⃣ ¿Qué es bootstrapApplication?
// Esto significa: “Arrancá la aplicación usando AppComponent como componente raíz”.

// 2️⃣ AppComponent
// Es el componente raíz: export class AppComponent { ... }
// Y en su HTML tenés: <router-outlet/>

// 3️⃣ appConfig
// ...appConfig
// El operador ... es el spread operator.
// Significa:  "Copiá todo lo que tenga appConfig aquí".

// 4️⃣ providers
// Los providers son servicios globales.

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(), // habilita HttpClient. Para que puedas usarlo en tus servicios: constructor(private http: HttpClient) {}
  ...appConfig.providers // Agrega todos los providers que ya estaban definidos en appConfig.
  ]
})
  .catch((err) => console.error(err));


// Flujo completo al iniciar la app
/*
  main.ts se ejecuta
          ↓
  bootstrapApplication()
          ↓
  Angular crea AppComponent
          ↓
  Carga providers (Router, HttpClient, etc.)
          ↓
  Renderiza la app en index.html  
*/
