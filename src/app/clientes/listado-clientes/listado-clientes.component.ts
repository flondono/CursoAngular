import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2'

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

  borrarCliente(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro?',
      text: "Esta accion no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar! ',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteCliente(id)
          .subscribe(() => {
            this.listadoClientes();
            swalWithBootstrapButtons.fire(
              'Borrar!',
              'Se eliminó correctamente al cliente.',
              'success'
            )
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelar',
          'Haz cancelado al accion :)',
          'error'
        )
      }
    })
  }
}
