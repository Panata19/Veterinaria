// agregar-editar-clientes.component.ts
import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interface/cliente.interface';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-clientes',
  templateUrl: './agregar-editar-clientes.component.html',
  styleUrls: ['./agregar-editar-clientes.component.css']
})
export class AgregarEditarClientesComponent  {
  sexo: any[] = ['Masculino', 'Femenino'];
  form: FormGroup;
  modo: string;
  
  constructor(
    public dialogRef: MatDialogRef<AgregarEditarClientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.modo = data.modo;
  
      // Inicializar el formulario con los campos y validadores correspondientes
      this.form = this.formBuilder.group({
        nombre: [data.cliente ? data.cliente.nombres : '', Validators.required],
        apellido: [data.cliente ? data.cliente.apellidos : '', Validators.required],
        edad: [data.cliente ? data.cliente.edad : '', Validators.required],
        sexo: [data.cliente ? data.cliente.sexo : '', Validators.required],
        nacionalidad: [data.cliente ? data.cliente.nacionalidad : '', Validators.required]
      });
  

   
  }

  guardar(): void {
    if (this.form.invalid) {
      return;
    }

    const cliente: Cliente = {
      id: this.data.cliente ? this.data.cliente.id : null,
      nombres: this.form.value.nombre,
      apellidos: this.form.value.apellido,
      edad: this.form.value.edad,
      sexo: this.form.value.sexo,
      nacionalidad: this.form.value.nacionalidad
    };

    this.dialogRef.close(cliente);
  }

  cancelar(): void {
    this.dialogRef.close();
  }



  
}
