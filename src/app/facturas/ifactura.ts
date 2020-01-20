import { IItemFactura } from './iitem-factura';
import { ICliente } from '../clientes/icliente';

export class IFactura {
    id: number;
    descripcion: string;
    observacion: string;
    items: Array<IItemFactura> = [];
    cliente: ICliente;
    total: number;
    createdAt: Date;

    calcularGranTotal(): number {
        this.total = 0;
        this.items.forEach((item: IItemFactura) => this.total += item.calcularImporte());
        return this.total;
    }
}
