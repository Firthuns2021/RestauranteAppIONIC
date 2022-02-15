import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from "../common/usuario.ts";
import {NavController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlUser = 'http://localhost:3000/user/';
  token: string = null;
  constructor(private http: HttpClient,
              private storage: Storage, private navCtrl: NavController) {

    this.init();
  }
  login(email: string, password: string) {
    const data = { email, password};
    return new Promise(resolve => {
      this.http.post(`${this.urlUser}login`,
        data).subscribe(this.promesaGuardaToken(resolve)
      );
    });
  }

  async guardarToken( token: string ) {
// guardamos el token en el storage de ionic
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }
  async cargarToken() {
    this.token = await this.storage.get('token') || null;
  }
  private async init() {
// iniciamos el storage de la base de datos de ionic
    await this.storage.create();
  }
  private promesaGuardaToken(resolve: (value: (PromiseLike<unknown> |
    unknown)) => void) {
    return async (resp: any) => {
      if (resp.ok) {
// si el login es correcto guardamos el token en el storage
        await this.guardarToken(resp.token);
        resolve(true);
      }
      else {
// si no es correcto el login el login borramos el token
        this.token = null;
        this.storage.clear();
        resolve(false);
      }
    };
  }

  // Registrar usuario
  registro( usuario: Usuario): Promise<any>{
    return new Promise( resolve => {
      this.http.post(`${this.urlUser}register`,
        usuario).subscribe(this.promesaGuardaToken(resolve));
    }).catch(err => {
        console.log(err);
      }
    );
  }


  // VERIFICAR TOKEN PARA EL GUARD
  async validaToken(): Promise<boolean> {
// cargamos el token del storage
    await this.cargarToken();
// Si no existe Token directamente salimos devolviendo una promesa a false
    if(!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${this.urlUser}user`, { headers })
        .subscribe( (resp: any) => {
          console.log(resp);
          if(resp.ok){
// si la respuesta tiene ok a true guardamos el usuario
// y resolvemos la promesa como true
//             this.usuario = resp.usuario;
            resolve(true);
          }else {
// si la respuesta tiene el ok a false devolvemos la promesa como false
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }
}
