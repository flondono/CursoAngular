import { IRegion } from './iregion';
import { IFactura } from '../facturas/ifactura';

export class ICliente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: Date;
    foto: string;
    region: IRegion;
    facturas: IFactura[] = [];
}