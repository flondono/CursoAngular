import { IProducto } from './iproducto';

export class IItemFactura {
    id: number;
    producto: IProducto;
    cantidad: number = 1;
    importe: number;

    public calcularImporte(): number {
        return this.cantidad * this.producto.precio;
    }
}