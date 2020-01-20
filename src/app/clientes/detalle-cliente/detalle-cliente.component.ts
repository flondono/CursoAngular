import { Component, OnInit } from '@angular/core';
import { ICliente } from '../icliente';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent implements OnInit {
  id: number;
  cliente: ICliente;
  constructor(private activatedRoute: ActivatedRoute,
    private clienteService: ClienteService,
    private router: Router, ) {
    this.id = +activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.detalleCliente();
  }

  detalleCliente() {
    this.clienteService.getClientePorId(this.id).subscribe(data => {
      console.log(data);
      this.cliente = data;
    })
  }

}
