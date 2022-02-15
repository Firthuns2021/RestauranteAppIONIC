import {Cliente} from './cliente';
export interface Usuario{
  _id: string;
  avatar: string;
  nombre: string;
  email: string;
  password: string;
  cliente: Cliente;

}
