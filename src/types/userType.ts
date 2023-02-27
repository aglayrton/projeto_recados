import { Recado } from './recadoType';
export interface User {
  email: string;
  password: string;
  recados: Recado[];
}
