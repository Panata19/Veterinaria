import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloLetrasPattern, soloNumerosPattern } from 'src/app/shared/Validaciones/validaciones';

@Component({
  selector: 'app-registro-hospitalizacion',
  templateUrl: './registro-hospitalizacion.component.html',
  styleUrls: ['./registro-hospitalizacion.component.css']
})
export class RegistroHospitalizacionComponent  {


  formularioRegistroHospitalizacion: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    raza: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    tipo: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    sexo: ['', [Validators.required, Validators.pattern(soloLetrasPattern)]],
    edad: ['', [Validators.required, Validators.pattern(soloNumerosPattern)]],
  }) ;

  constructor(private fb: FormBuilder) { }

  validarCampoSoloLetras(campo: string){
    return this.formularioRegistroHospitalizacion.get(campo)?.invalid 
            && this.formularioRegistroHospitalizacion.get(campo)?.touched;
  }

  validarCampoSoloNumeros(campo: string){
    return this.formularioRegistroHospitalizacion.get(campo)?.invalid 
            && this.formularioRegistroHospitalizacion.get(campo)?.touched;
  }

}


