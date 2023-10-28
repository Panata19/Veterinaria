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
import { TIPO_IMPUTS_HOSPITALIZACION } from 'src/app/shared/config/config';

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
  TIPO_INPUTS!          : TipoInputs;
  filtroSeleccionado!   : string;
  inputSeleccionado!    : OpcionesInput;
  tipoFiltros!          : TipoFiltros[];
  
  constructor(private hs: HosipitalizacionService, private router: Router, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.page = 0;
    this.entradas = "5";
    this.filtroSeleccionado = "";    
    this.hs.allHospitalizaciones.subscribe(hospitalizaciones => this.dataHospitalizaciones = hospitalizaciones );

    this.TIPO_INPUTS = TIPO_IMPUTS_HOSPITALIZACION;

    this.inputSeleccionado = this.TIPO_INPUTS[''];
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
      height: '800px',
      data: hospitalizacion
    });
  }

  eliminarDetallesHospitalizacion():MatDialogRef<ModalEliminarhospitalizacionComponent>{
    return this.matDialog.open(ModalEliminarhospitalizacionComponent, {
      width: '600px',
    });
  }
}
