import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardianService } from './login-guardian.service';

export const routes: Routes = [
    // Aplicación del Guardián en las Rutas   
    // Una vez que el guardián esté implementado, es necesario aplicarlo a las rutas que queremos proteger
    //Esto se hace mediante la propiedad canActivate en la configuración de rutas
    // canActivate: [LoginGuardianService]: Protege las rutas, asegurándose de que solo se puedan acceder si el usuario ha iniciado sesión. 
    // Rutas Protegidas: Las rutas listado, agregar, y editar están protegidas por el guardián. Solo se puede acceder a ellas si el usuario está autenticado. 
    // Ruta de Login: La ruta de login no está protegida por el guardián, ya que debe ser accesible sin autenticación.
    {path:'', component: ListadoProductosComponent, canActivate:[LoginGuardianService]}, //localhost:4200/
    // Ruta /listado
    // http://localhost:4200/listado
    {path:'listado', component: ListadoProductosComponent, canActivate:[LoginGuardianService]},
    // Ruta /agregar
    // http://localhost:4200/agregar
    {path:'agregar', component: FormularioComponent, canActivate:[LoginGuardianService]},
    // Ruta con parámetro /editar/:id
    // : indica parámetro dinámico.
    // Ejemplo: http://localhost:4200/editar/5
    // cambiamos el parámetro de :id por :llave
    {path:'editar/:llave', component: FormularioComponent , canActivate:[LoginGuardianService]},
    {path: 'login', component: LoginComponent},
    // Ruta comodin para cualquier otra ruta no registrada
    {path: '**', component: ErrorComponent}
];


/*
Usuario navega a /editar/3
        ↓
Router encuentra path 'editar/:id'
        ↓
Carga FormularioComponent
        ↓
El componente lee id = 3
        ↓
Muestra producto para editar
*/