import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Restaurante} from '../common/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  // Definimos la URL de la API
  private baseURL = 'http://localhost:3000/api';

  // Inyectamos el cliente http para poder hacer peticiones Http
  // A la API

  constructor(private http: HttpClient) { }

  //Creamos la función que nos devolverá el array de restaurantes
  getRestauranteList(): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(`${this.baseURL}/restaurantes`);
  }

  // Traemos el array de categorías distintas desde la API
  getCategorias(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseURL}/categorias`);
  }

  getRestauranteCat(categoria: string): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(
      `${this.baseURL}/categoria/${categoria}`);
  }

  searchRestaurantes(theKeyword: string): Observable<Restaurante[]> {
    return this.http.get<Restaurante[]>(
      `${this.baseURL}/restaurantes/nombre/${theKeyword}`);
  }

  // Función para cargar un restaurante desde la API
  getRestaurante(idRestaurante: string): Observable<Restaurante> {
    return this.http.get<Restaurante>(
      `${this.baseURL}/restaurantes/${idRestaurante}`);
  }

  // Actualizar un restaurante para insertar el comentario
  updateRestaurante(restaurante: Restaurante): Observable<Restaurante> {
    return this.http.put<Restaurante>(
      `${this.baseURL}/restaurante/${restaurante._id}`, restaurante);
  }
}
