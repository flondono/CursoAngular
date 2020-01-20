import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ICliente } from '../icliente';
import { IRegion } from '../iregion';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  //Formulario contenedor de los controles
  public formularioCrearCliente: FormGroup;
  //Regiones que se van a listar en el select
  regiones: IRegion
  //Bandera para envio del formulario
  submitted: boolean = false;
  //Esta variable guarda el id que llega como parametro en la url
  id: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {
    //id que recibimos en la url
    this.id = +this.activatedRoute.snapshot.params['id'];
    // inicializamos esta funcion para llenar los datos en los controles (campos) del formulario
    this.getClientePorId();
  }

  ngOnInit() {
    this.validarDataFormulario();
    this.listadoRegiones();
  }

  //Esta funcion consume el servicio y devuelve el cliente por el id
  getClientePorId() {
    this.clienteService.getClientePorId(this.id).subscribe(data => {
      console.log(data);
      //Hacemos destructuring para tener manejo de las propiedades
      //del objeto que nos devuelve el servicio
      const { id, nombre, apellido, email, createdAt, region } = data;
      //llenamos los controles con la info del cliente
      this.formularioCrearCliente = this.fb.group({
        id: [id],
        nombre: [nombre, Validators.required],
        apellido: [apellido, Validators.required],
        email: [email, [Validators.required, Validators.email]],
        createdAt: [createdAt, Validators.required],
        region: [region, Validators.required]
      })

    })
  }
  //ESta funcion hace las validaciones de los controles(campos)
  validarDataFormulario() {
    this.formularioCrearCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      createdAt: ['', Validators.required],
      region: ['', Validators.required]
    })
  }

  //Este metodo get de angular nos devuelve cada control como un objeto
  //asi podemos tratar sus propiedades
  get f() {
    return this.formularioCrearCliente.controls
  }

  //
  listadoRegiones() {
    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    })
  }

  editarCliente() {
    this.submitted = true;
    if (this.formularioCrearCliente.invalid) {
      return
    }
    this.clienteService.updateCliente(this.formularioCrearCliente.value).subscribe(response => {
      this.router.navigate(['/listado'])
    })
  }

  //Esta función nos devuelve un true si la comparación coincide
  compararRegion(regionData: IRegion, regionSelecHtml: IRegion): boolean {
    return regionData === null && regionSelecHtml === null ? false : regionData.id === regionSelecHtml.id;
  }
}
