import { Component, Inject } from '@angular/core';
import { Paciente } from '../../interface/paciente.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-editar-pacientes',
  templateUrl: './agregar-editar-pacientes.component.html',
  styleUrls: ['./agregar-editar-pacientes.component.css']
})
export class AgregarEditarPacientesComponent {

  sexo: any[] = ['Masculino', 'Femenino'];
  tipoPacient: any[] = ['Perro', 'Gato'];
  modo: string;
  pacienteForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarEditarPacientesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.modo = data.modo;

    // Inicializar el formulario con los campos y validadores correspondientes
    this.pacienteForm = this.formBuilder.group({
      nombre: [data.paciente ? data.paciente.nombre : '', [Validators.required, Validators.maxLength(30)]],
      sexo: [data.paciente ? data.paciente.sexo : '', Validators.required],
      Fechadenacimiento: [data.paciente ? data.paciente.Fechadenacimiento : '',[Validators.required, this.fechaNacimientoValidator]],
      raza: [data.paciente ? data.paciente.raza : '', [Validators.required, Validators.maxLength(15)]],
      tipoPaciente: [data.paciente ? data.paciente.tipoPaciente : '', Validators.required],
      peso: [data.paciente ? data.paciente.peso : '',  [Validators.required, Validators.pattern('^[0-9]{1,3}$')]]
    });
  }


  fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
    const fechaNacimiento = control.value;
    const fechaActual = new Date();

    if (fechaNacimiento && fechaNacimiento > fechaActual) {
      return { fechaNacimientoInvalida: true };
    }

    return null;
  }


  
  guardar(): void {
    if (this.pacienteForm.invalid) {
      return;
    }

    const paciente: Paciente = {
      id: this.data.paciente ? this.data.paciente.id : null,
      nombre: this.pacienteForm.value.nombre,
      sexo: this.pacienteForm.value.sexo,
      Fechadenacimiento: this.pacienteForm.value.Fechadenacimiento,
      tipoPaciente: this.pacienteForm.value.tipoPaciente,
      raza: this.pacienteForm.value.raza,
      peso: this.pacienteForm.value.peso
    };

    this.dialogRef.close(paciente);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}