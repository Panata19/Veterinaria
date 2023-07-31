import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { arreglarFecha, soloLetrasPattern } from 'src/app/shared/Validaciones/validaciones';
import { HosipitalizacionService } from '../../../services/hosipitalizacion.service';
import { Paciente } from '../../../interfaces/paciente.interface';
import { Medico } from '../../../interfaces/medico.interface';
import { Hospitalizacion } from '../../../interfaces/hospitalizacion.interface';
import { TipoCirugias } from '../../../interfaces/tipoCirugias.interface';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro-hospitalizacion',
  templateUrl: './registro-hospitalizacion.component.html',
  styleUrls: ['./registro-hospitalizacion.component.css']
})

export class RegistroHospitalizacionComponent implements OnInit {

  pacientes!: Paciente[];
  medicos!: Medico[];
  hospitalizaciones!: Hospitalizacion[];
  tiposCirugia!: TipoCirugias[];

  formularioRegistroHospitalizacion: FormGroup = this.fb.group({
    idPaciente:        [''],
    nombre:            ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    fechaNac:          ['', Validators.required],
    raza:              ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    tipo:              ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    sexo:              ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    idHospitalizacion: [''],
    motivo:            ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    fechaIngreso:      ['', [Validators.required, this.fechaMayorActual]],
    fechaSalida:       ['', [Validators.required, this.fechaMayorActual]],
    doctorEncargado:   ['', Validators.required],
    tipoCirugia:       ['', Validators.required],
    fechaProgramada:   ['', [Validators.required, this.fechaMayorActual]]
  }) ; 
 
  constructor(private fb: FormBuilder, 
              private hs: HosipitalizacionService, 
              public dialogRefRegistroHosp: MatDialogRef<RegistroHospitalizacionComponent>
             ) { }

  ngOnInit(): void {
    this.hs.allPacientes.subscribe(pacientes => this.pacientes = pacientes);
    this.hs.allMedicos.subscribe(medicos => this.medicos = medicos);
    // this.hs.allHospitalizaciones.subscribe(hospitalizaciones => this.hospitalizaciones = hospitalizaciones);
    this.hs.allTipoCirugias.subscribe(tipoCirugias => this.tiposCirugia = tipoCirugias);
  }

  //SECCIÓN DE ERRORES

  //Este método crea un error cuando la fecha que ingresamos es menor a la fecha actual
  fechaMayorActual(campo: FormControl): object | null{
    const fecha = new Date(arreglarFecha(campo.value));
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);

    if(fecha < fechaActual) return { fechaInvalid: true };
    
    return null;
  }

  /* ***************************************************************************** */

  //SECCION DE VALIDACIONES

  //Este método evalúa si un campo es invalido y ha sido tocado(clic sobre el campo).
  campoNoValido(campo: string): boolean | undefined{
    return this.formularioRegistroHospitalizacion.get(campo)?.invalid &&
           this.formularioRegistroHospitalizacion.get(campo)?.touched;
  }

  //Este método evalúa si un campo contiene solo letras
  validarCamposSoloLetras(campo: string): string{
    const errors = this.formularioRegistroHospitalizacion.get(campo)?.errors;
    if(errors?.['required']){
      return '*Este campo es requerido';
    } else if(errors?.['pattern']){
      return '*Este campo solo debe tener letras';
    }
    return '';
  }

  //Este método evalúa si un campo contiene solo números
  validarCamposSoloNumeros(campo: string): string{
    const errors = this.formularioRegistroHospitalizacion.get(campo)?.errors;

    if(errors?.['required']){
      return '*Este campo es requerido';
    } else if (errors?.['pattern']){
      return '*Este campo debe tener números positivos';
    }
    return '';
  }

   //Este método valida que la fecha que ingresamos no sea menor a la fecha actual
  validarFecha(campo: string): string{
    const errors = this.formularioRegistroHospitalizacion.get(campo)?.errors;

    if(errors?.['required']){
      return '*Este campo es requerido';
    } else if (errors?.['fechaInvalid']){
      return '*La fecha que ingreso no debe ser menor que la actual';
    }
    return '';
  }

  ValidarOpcionSeleccionada(campo: string): string{
    const errors = this.formularioRegistroHospitalizacion.get(campo)?.errors;

    if(errors?.['required']) return '*No ha seleccionado una opción';

    return '';
  }

  /* ***************************************************************************** */

  //Este método carga los campos en sus respectivos inputs si el input nombre y fechaNac son llenados
  cargarCampos(): void{
    let nombre: string = this.formularioRegistroHospitalizacion?.get('nombre')?.value;
    let fechaNac: string = this.formularioRegistroHospitalizacion?.get('fechaNac')?.value ;

    if(!nombre || !fechaNac) return;

    const paciente = this.pacientes.find(p => p.nombrePaciente.toLowerCase().trim() === nombre.toLowerCase().trim() && 
                                              new Date(fechaNac).getTime() === new Date(p.fechaNac).getTime()
    );
    
    if(!paciente) return;

    this.formularioRegistroHospitalizacion.patchValue({
      idPaciente: paciente?.idPaciente,
      raza:       paciente?.raza,
      tipo:       paciente?.tipoPaciente.tipoPaciente,
      sexo:       paciente?.sexo,
    });
  }
  
  // Este método registra una nueva hospitalización
  registrarHospitalizacion(): void{
    if(this.formularioRegistroHospitalizacion.invalid){
      this.formularioRegistroHospitalizacion.markAllAsTouched();
      return;
    }

    this.formularioRegistroHospitalizacion.patchValue({
      idHospitalizacion: this.hospitalizaciones[this.hospitalizaciones.length - 1].idHospitalizacion + 1,
    })

    const {idHospitalizacion, idPaciente, fechaIngreso, fechaSalida, motivo} = this.formularioRegistroHospitalizacion.value;
    const nuevaHospitalizacion = { idHospitalizacion, idPaciente, fechaIngreso, fechaSalida, motivo };
    // this.hs.registrarNuevaHospitalizacion(nuevaHospitalizacion).subscribe(hospitalizacion => console.log(hospitalizacion));
  }

}


