import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {

  clientes: [] = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.listadoClientes();
  }

  listadoClientes() {
  this.clienteService.getClientes().subscribe(clientes => {
      console.log(clientes);
      this.clientes = clientes;
    })
  }
}
