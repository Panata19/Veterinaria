import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../interface/paciente.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../../service/paciente.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-pacientes',
  templateUrl: './agregar-editar-pacientes.component.html',
  styleUrls: ['./agregar-editar-pacientes.component.css']
})
export class AgregarEditarPacientesComponent implements OnInit {

    sexo: any[] = ['Masculino', 'Femenino'];
    form: FormGroup;
    id: number;
    operacion: string = 'Agregar';
  
    constructor(
      private fb: FormBuilder,
      private Pacienteservice: PacienteService,
      private router: Router,
      private snackBar: MatSnackBar,
      private activatedRoute: ActivatedRoute
    ) {
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        sexo: ['', Validators.required],       
        edad: ['', Validators.required],
        raza: ['', Validators.required],
        peso: ['', Validators.required]

      });
  
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  
    ngOnInit(): void {
      if (this.id !== 0) {
        this.operacion = 'Editar';
        const Paciente = this.Pacienteservice.ConseguirPaciente().find(c => c.id === this.id);
        if (Paciente) {
          this.form.patchValue({
            nombre: Paciente.nombre,
            sexo: Paciente.sexo,          
            edad: Paciente.edad,
            raza: Paciente.raza,            
            peso: Paciente.peso
          });
        }
      }
    }
  
    agregarPaciente(): void {
      const Paciente: Paciente = {

        nombre: this.form.value.nombre,
        sexo: this.form.value.sexo,       
        edad: this.form.value.edad,
        raza: this.form.value.raza,            
        peso: this.form.value.peso
        
      };
  
      if (this.id === 0) {
        this.Pacienteservice.Agregarpacientes(Paciente);
      } else {
        Paciente.id = this.id;
        this.Pacienteservice.Editarpacientes(Paciente);
      }
  
      this.router.navigate(['/paciente/listado']);
  
      this.snackBar.open('El paciente fue ' + (this.id === 0 ? 'agregado' : 'editado') + ' con éxito', '', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }
  }

