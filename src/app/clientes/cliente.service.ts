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
}
