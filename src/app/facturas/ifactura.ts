import { IItemFactura } from './iitem-factura';
import { ICliente } from '../clientes/icliente';

export class IFactura {
    id:number;
    descripcion:string;
    observacion:string;
    item: Array<IItemFactura>=[];
    cliente:ICliente;
    total:number;
    createdAt:Date;
}
