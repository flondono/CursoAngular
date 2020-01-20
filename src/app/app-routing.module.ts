import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './clientes/editar-cliente/editar-cliente.component';
import { CrearFacturaComponent } from './facturas/crear-factura/crear-factura.component';
import { DetalleClienteComponent } from './clientes/detalle-cliente/detalle-cliente.component';

const routes: Routes = [
  {
    path: 'listado',
    component: ListadoClientesComponent
  },
  {
    path: 'crear',
    component: CrearClienteComponent
  },
  {
    path: 'editar/:id',
    component: EditarClienteComponent
  },
  {
    path: 'crear/factura/:id',
    component: CrearFacturaComponent
  },
  {
    path: 'clientes/detalle/:id',
    component: DetalleClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
