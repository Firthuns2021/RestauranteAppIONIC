import {Direccion} from './direccion';
import {Plato} from './plato';
import {Restaurante} from './restaurante';

export class Cliente {
  _id: string;
  nombre: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: Direccion[];
  platosFav: Plato[];
  restaurantesFav: Restaurante[];
  restaurante: boolean;
}
