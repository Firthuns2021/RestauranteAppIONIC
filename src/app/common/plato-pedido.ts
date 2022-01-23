import {Plato} from "./plato";

export class PlatoPedido {
  _id: string;
  plato: Plato;
  extras: {nombre: string; coste: number}[];
  pedidoId: string;
  cantidad: number;
  precioTotal: number;
  constructor(plato: Plato) {
    this.plato = plato;
    this.cantidad = 1;
    this.extras = [];
  }
}
