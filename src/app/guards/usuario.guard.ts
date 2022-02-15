import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from "../services/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService) {
  }
// si utilizamos validación de activar el componente
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }
// Si utilizamos validación de carga del componente. La carga es   antes de la activación
  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.usuarioService.validaToken();
  }
}
