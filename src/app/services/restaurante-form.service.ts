import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteFormService {

  constructor() { }
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
}
