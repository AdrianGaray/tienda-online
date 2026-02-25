import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';
import { FormularioComponent } from './formulario/formulario.component';

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
    {path:'editar/:id', component: FormularioComponent }
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