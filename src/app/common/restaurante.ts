import {Comentario} from './comentario';
import {Plato} from "./plato";

export class Restaurante {
  _id: string;
  nombre: string;
  imgLogo: string;
  descripcion: string;
  rangoMaxReparto: string;
  destacado: boolean;
  activo: boolean;
  localizacion: string;
  categoria: string;
  horario: [
    {
      dia: number;
      apertura: number;
      cierre: number;
    }
  ];
  comentarios: Comentario[];
  platos: Plato[];
  dateCreated: Date;
  lastUpdated: Date;
}
