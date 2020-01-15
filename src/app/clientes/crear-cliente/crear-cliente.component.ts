import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ICliente } from '../icliente';
import { IRegion } from '../iregion';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public formularioCrearCliente: FormGroup;
  regiones: IRegion
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) { }

  ngOnInit() {
    this.validarDataFormulario();
    this.listadoRegiones();
  }

  validarDataFormulario() {
    this.formularioCrearCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      createdAt: ['', Validators.required],
      region: ['', Validators.required]
    })
  }

  get f() {
    return this.formularioCrearCliente.controls
  }

  listadoRegiones() {
    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    })
  }

  crearCliente() {
    this.submitted = true;
    if (this.formularioCrearCliente.invalid) {
      return
    }
    this.clienteService.postCliente(this.formularioCrearCliente.value).subscribe(response => {
      this.router.navigate(['/listado'])
    })
  }
}
