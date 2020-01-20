import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { ICliente } from './icliente';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IRegion } from './iregion';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  regiones: IRegion;
  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/clientes`);
  }

  postCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.post<ICliente>(`${environment.baseUrl}/clientes`, cliente);
  }

  getRegiones(): Observable<IRegion> {
    return this.http.get<IRegion>(`${environment.baseUrl}/clientes/regiones`);
  }

  getClientePorId(id: number): Observable<ICliente> {
    return this.http.get<ICliente>(`${environment.baseUrl}/clientes/${id}`);
  }

  updateCliente(cliente: ICliente): Observable<ICliente> {
    return this.http.put<ICliente>(`${environment.baseUrl}/clientes/${cliente.id}`, cliente);
  }

  deleteCliente(id: number): Observable<ICliente> {
    return this.http.delete<ICliente>(`${environment.baseUrl}/clientes/${id}`);
  }
}
