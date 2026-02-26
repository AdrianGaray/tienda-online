import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

// Los guardianes en Angular son servicios que pueden controlar el acceso a las rutas en la aplicación
// Un guardián debe implementar una de las interfaces del módulo de rutas, como CanActivate, CanDeactivate, CanLoad, entre otras. 
// CanActivate: Evalúa si se puede activar una ruta antes de permitir el acceso. 
export class LoginGuardianService implements CanActivate{

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  // Verifica si el usuario está autenticado antes de activar la ruta
  canActivate(): boolean {
    if(this.loginService.isAutenticado()){
      return true;  // Permitir el acceso si está autenticado 
    }
    else{
      this.router.navigate(['login']); // Redirigir al login si no está autenticado 
      return false;
    }
  }

  
}
