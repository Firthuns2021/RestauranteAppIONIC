import {Comentario} from './comentario';

export class Plato {
  _id: string;
  nombre: string;
  precioBase: number;
  descripcion: string;
  alergenos: string[];
  imgPlato: string;
  extra: [
    {
      nombre: string;
      coste: number;
    }
  ];
  comentarios: Comentario[];
}
