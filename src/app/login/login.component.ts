import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // 5️⃣ ¿Qué hace el método login()?
  // Cuando el usuario envía el formulario:
  //  1️⃣ Angular pasa el formulario completo como parámetro
  //  2️⃣ form.value contiene todos los valores
  login(form: NgForm){
   const email = form.value.email;
   const password = form.value.password; 
  }

/* Flujo Normal:
    Usuario escribe email y password
            ↓
    ngModel guarda los valores
            ↓
    Click en "Iniciar Sesión"
            ↓
    ngSubmit se ejecuta
            ↓
    Si el form es válido
            ↓
    login(f)
            ↓
    Extrae email y password
*/

}
