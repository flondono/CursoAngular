import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../factura.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/clientes/cliente.service';
import { ICliente } from 'src/app/clientes/icliente';
import { IFactura } from '../ifactura';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { IProducto } from '../iproducto';
import { map, flatMap } from 'rxjs/operators';
import { IItemFactura } from '../iitem-factura';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  submitted: boolean = false;
  id: number;
  public formularioFactura: FormGroup;
  factura: IFactura = new IFactura;
  myControl = new FormControl();

  filteredOptions: Observable<IProducto[]>

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    //Esta variable obtiene la url con el id del cliente
    this.id = this.activatedRoute.snapshot.params['id'];
    this.clienteService.getClientePorId(this.id).subscribe(cliente => {
      this.factura.cliente = cliente;
    });
  }

  ngOnInit() {
    this.formularioFactura = this.fb.group({
      //Cada
      descripcion: ['', Validators.required],
      observacion: ['', Validators.required]
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this.filtrarProducto(value) : [])
    )
  }

  private filtrarProducto(value: string): Observable<IProducto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  get f() {
    return this.formularioFactura.controls;
  }

  crearFactura() {
    this.submitted = true;
    if (this.formularioFactura.invalid) {
      return;
    }
    const objetoFactura = Object.assign(this.factura, this.formularioFactura.value);
    this.facturaService.postFactura(this.formularioFactura.value).subscribe(response => {
      Swal.fire("Exito", "Se creo correctamente la factura", "success")
      this.router.navigate(["/listado"])
    });
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent) {

    const producto = event.option.value as IProducto;

    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id);
    } else {
      const nuevoItem = new IItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }
    this.myControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  incrementarCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: IItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItem(id: number) {
    this.factura.items = this.factura.items.filter((item: IItemFactura) => id !== item.producto.id)
  }
  actualizarCantidad(id: number, event: any) {
    const cantidad: number = event.target.value as number;
    if (+cantidad === 0) {
      return this.eliminarItem(id);
    }

    this.factura.items = this.factura.items.map((item: IItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    }
    )
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: IItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }
}
