import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pedido} from '../common/pedido';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private compraURL = 'http://localhost:3000/api/pedido/add';
  constructor(private http: HttpClient) { }
  realizarCompra(pedido: Pedido): Observable<any> {
    return this.http.post<Pedido>(this.compraURL, pedido);
  }

}
