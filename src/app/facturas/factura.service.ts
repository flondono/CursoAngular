import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFactura } from './ifactura';
import { environment } from 'src/environments/environment';
import { IProducto } from './iproducto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getFactura(id: number): Observable<IFactura> {
    return this.http.get<IFactura>(`${environment.baseUrl}/facturas/${id}`);
  }
  postFactura(factura: IFactura): Observable<IFactura> {
    return this.http.post<IFactura>(`${environment.baseUrl}/facturas`, factura);
  }

  filtrarProductos(term: string): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${environment.baseUrl}/facturas/filtrar-productos/${term}`);
  }
}
