import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Hospitalizacion } from '../../../interfaces/hospitalizacion.interface';
import { OpcionesInput } from '../../../interfaces/opcionesInput.interface';
import { TipoFiltros } from '../../../interfaces/tipoFiltros.interface';
import { TipoInputs } from '../../../interfaces/tipoInputs';
import { HosipitalizacionService } from '../../../services/hosipitalizacion.service';
import { DetalleHospitalizacionComponent } from '../../modals/detalle-hospitalizacion/detalle-hospitalizacion.component';
import { ModalEliminarhospitalizacionComponent } from '../../modals/modal-eliminar/modal-eliminar.component';

@Component({
  selector: 'app-table-desktop',
  templateUrl: './table-desktop.component.html',
  styleUrls: ['./table-desktop.component.css']
})
export class TableDesktopComponent implements OnInit {

  tablaColumnas         : string[] = ['N.', 'Nombre Paciente', 'Tipo Paciente', 'Motivo Hospitalización', 'Fecha Ingreso', 'Opciones'];
  entradas!             : string;
  page!                 : number;
  textoFiltro!          : string;
  dataHospitalizaciones : Hospitalizacion[] = [];
  tipoInputs!           : TipoInputs;
  filtroSeleccionado!   : string;
  inputSeleccionado!    : OpcionesInput;
  tipoFiltros!          : TipoFiltros[];
  
  constructor(private hs: HosipitalizacionService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.page = 0;
    this.entradas = "5";
    this.filtroSeleccionado = "";    
    this.hs.allHospitalizaciones.subscribe(hospitalizaciones => this.dataHospitalizaciones = hospitalizaciones );

    this.tipoInputs = {
      ''              : { tipo: 'text', placeholder: 'Buscar...', disable: true }, 
      'nombrePaciente': { tipo: 'text', placeholder: 'Buscar Paciente', disable: false},
      'fechaNac'      : { tipo: 'date', nombre: 'fechaNac', disable: false },
      'fechaIngreso'  : { tipo: 'date', nombre: 'fechaIngreso', disable: false },
      'todos'         : { tipo: '', placeholder: '', disable: true}
    };

    this.inputSeleccionado = this.tipoInputs[''];
  }

  irPaginaHistorialClinicaPaciente(){
    this.router.navigate(['historialClinico/historalClinicoPaciente']);
  }

  get allHospitalizacion(): Hospitalizacion[]{
    return [...this.dataHospitalizaciones];
  }
  
  paginaSiguiente(){ this.page += parseInt(this.entradas); }

  paginaAnterior(){ 
    if(this.page > 0) this.page -= parseInt(this.entradas); 
    if(this.page < parseInt(this.entradas)) this.page = 0;
  }

  abrirDetallesHospitaliacion(hospitalizacion: Hospitalizacion): MatDialogRef<DetalleHospitalizacionComponent>{
    return this.matDialog.open(DetalleHospitalizacionComponent, {
      width: '1600px',
      height: '600px',
      data: hospitalizacion
    });
  }

  eliminarDetallesHospitalizacion():MatDialogRef<ModalEliminarhospitalizacionComponent>{
    return this.matDialog.open(ModalEliminarhospitalizacionComponent, {
      width: '600px',
      height: '100px'
    });
  }

}
