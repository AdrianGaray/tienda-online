import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ErrorComponent } from './error/error.component';

export const routes: Routes = [
    {path:'', component: ListadoProductosComponent}, //localhost:4200/
    // Ruta /listado
    // http://localhost:4200/listado
    {path:'listado', component: ListadoProductosComponent},
    // Ruta /agregar
    // http://localhost:4200/agregar
    {path:'agregar', component: FormularioComponent},
    // Ruta con parámetro /editar/:id
    // : indica parámetro dinámico.
    // Ejemplo: http://localhost:4200/editar/5
    // cambiamos el parámetro de :id por :llave
    {path:'editar/:llave', component: FormularioComponent },
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