import {Direccion} from './direccion';
import {Cliente} from './cliente';
import {Restaurante} from './restaurante';
import {PlatoPedido} from './plato-pedido';


export class Pedido {
  _id: string;
  estado: boolean;
  cliente: Cliente;
  direccionFactura: Direccion;
  direccionEntrega: Direccion;
  restaurante: Restaurante;
  costeTransporte: number;
  precioTotal: number;
  fecha: Date;
  cuponDescuento: string;
  platosPedido: PlatoPedido[];
}
