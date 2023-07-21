// agregar-editar-clientes.component.ts
import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Cliente } from '../../interface/cliente.interface';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../service/cliente.service';
import { ClienteregistradoComponent } from '../verificacion/Clienteregistrado/clienteregistrado.component';

@Component({
  selector: 'app-agregar-editar-clientes',
  templateUrl: './agregar-editar-clientes.component.html',
  styleUrls: ['./agregar-editar-clientes.component.css']
})
export class AgregarEditarClientesComponent {
  sexo: any[] = ['Masculino', 'Femenino'];
  estado: any[] = ['Activo', 'Inactivo'];
  form: FormGroup;
  modo: string;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private dialog: MatDialog
  ) {
    this.modo = data.modo;

    this.form = this.formBuilder.group({
      numDoc: [data.cliente ? data.cliente.numDocumento : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      nombre: [data.cliente ? data.cliente.nombreCliente : '', [Validators.required, Validators.maxLength(30)]],
      estado: [data.cliente ? data.cliente.estado : true, Validators.required],
      apellido: [data.cliente ? data.cliente.apellidosCliente : '', [Validators.required, Validators.maxLength(30)]],
      sexo: [data.cliente ? data.cliente.sexo : '', Validators.required],
      telefono: [data.cliente ? data.cliente.telefono : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      direccion: [data.cliente ? data.cliente.direccion : '', [Validators.required, Validators.maxLength(30)]],
      correo: [data.cliente ? data.cliente.correo : '', Validators.email],
      fechaNac: [data.cliente ? data.cliente.fechaNac : '', [Validators.required, this.fechaNacimientoValidator]],
      nacionalidad: [data.cliente ? data.cliente.nacionalidad : '', [Validators.required, Validators.maxLength(15)]],
      fechaCreacio: [data.cliente ? data.cliente.fechaCreacio : null],
    });

    if (this.modo === 'editar') {
      this.form.addControl('estado', this.formBuilder.control(data.cliente ? data.cliente.estado : true, Validators.required));
    }

  }


  fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = control.value;
    const fechaActual = new Date();

    if (fechaNacimiento && fechaNacimiento > fechaActual) {
      return { fechaNacimientoInvalida: true };
    }

    return null;
  }

  getErrorMessage() {
    const correoControl = this.form?.get('correo');

    if (correoControl?.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return correoControl?.hasError('email') ? 'Correo inválido' : '';
  }



  guardar(): void {
    if (this.form.invalid) {
      return;
    }

    const numDoc = this.form.value.numDoc;
    const currentClientId = this.data.cliente ? this.data.cliente.id : null;


    if (this.clienteService.ClienteExistente(numDoc, currentClientId)) {
      const dialogRef = this.dialog.open(ClienteregistradoComponent, {
        data: {
          titulo: '¡Advertencia!',
          mensaje: 'Este usuario ya ha sido registrado',
        },
      });

      return;
    }

    const cliente: Cliente = {
      id: this.data.cliente ? this.data.cliente.id : null,
      numDocumento: this.form.value.numDoc,
      nombreCliente: this.form.value.nombre,
      estado: this.form.value.estado,
      apellidosCliente: this.form.value.apellido,
      sexo: this.form.value.sexo,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      correo: this.form.value.correo,
      fechaNac: this.form.value.fechaNac,
      nacionalidad: this.form.value.nacionalidad,
      fechaCreacion: this.form.value.fechaCreacion

    };

    this.dialogRef.close(cliente);
  }


  cancelar(): void {
    this.dialogRef.close();
  }




}
