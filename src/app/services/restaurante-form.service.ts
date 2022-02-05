import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestauranteFormService {

  urlCountries = 'http://locahost:3000/api/countries';

  constructor(private  http: HttpClient) {  }

  getCountries(): Observable<{country: string}[]>{
      return this.http.get<{country: string}[]>(this.urlCountries);
  }

  getStates(country: string): Observable<string[]> {
    return this.http.get<{states:
        string[]}>(`${this.urlCountries}/states/${country}`).pipe(
      map(response => response.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const data: number[] = [];

    // Creamos un array para la lista desplegable de meses
    // Empezamos en el mes actual y luego le damos la vuelta hasta el 12
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      if (startMonth ===13) {
        startMonth = 1;
      }
      data.push(startMonth++);
    }
    // Utilizamos el comando of para devolver un objeto como observable para poder subscribirse
    return of(data);
  }

  getCreditCardYears(): Observable<number[]>{
    const data: number[] = [];

    // Para los años, empezaremos en el año actual y añadiremos los 9 siguientes
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);
  }

  getPaises(): Observable<{country: string}[]> {
    return this.http.get<{country: string}[]>(this.urlCountries);
  }
}
