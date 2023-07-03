// agregar-editar-clientes.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interface/cliente.interface';
import { ClienteService } from '../../service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-editar-clientes',
  templateUrl: './agregar-editar-clientes.component.html',
  styleUrls: ['./agregar-editar-clientes.component.css']
})
export class AgregarEditarClientesComponent implements OnInit {
  sexo: any[] = ['Masculino', 'Femenino'];
  form: FormGroup;
  id: number;
  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],
      nacionalidad: ['', Validators.required]
    });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar';
      const cliente = this.clienteService.getCliente().find(c => c.id === this.id);
      if (cliente) {
        this.form.patchValue({
          nombre: cliente.nombres,
          apellido: cliente.apellidos,
          edad: cliente.edad,
          sexo: cliente.sexo,
          nacionalidad: cliente.nacionalidad
        });
      }
    }
  }

  agregarEditarCliente(): void {
    const cliente: Cliente = {
      nombres: this.form.value.nombre,
      apellidos: this.form.value.apellido,
      edad: this.form.value.edad,
      sexo: this.form.value.sexo,
      nacionalidad: this.form.value.nacionalidad
    };

    if (this.id === 0) {
      this.clienteService.addCliente(cliente);
    } else {
      cliente.id = this.id;
      this.clienteService.editCliente(cliente);
    }

    this.router.navigate(['/cliente/listado']);

    this.snackBar.open('El Cliente fue ' + (this.id === 0 ? 'agregado' : 'editado') + ' con éxito', '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
