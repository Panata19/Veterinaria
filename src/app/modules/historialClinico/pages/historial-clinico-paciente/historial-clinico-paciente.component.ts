import { Component, OnInit } from '@angular/core';
import { HistorialClinicoService } from '../../services/historial-clinico.service';
import { Router } from '@angular/router';
import { Hospitalizacion } from 'src/app/modules/hospitalizacion/interfaces/hospitalizacion.interface';
import { ModalEliminarHistorialComponent } from '../../components/modals/modal-eliminar/modal-eliminar.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleHospitalizacionComponent } from 'src/app/modules/hospitalizacion/components/modals/detalle-hospitalizacion/detalle-hospitalizacion.component';
import { TipoInputs } from 'src/app/modules/hospitalizacion/interfaces/tipoInputs';
import { OpcionesInput } from 'src/app/modules/hospitalizacion/interfaces/opcionesInput.interface';
import { TipoFiltros } from 'src/app/modules/hospitalizacion/interfaces/tipoFiltros.interface';
import { HosipitalizacionService } from 'src/app/modules/hospitalizacion/services/hosipitalizacion.service';

@Component({
  selector: 'app-historial-clinico-paciente',
  templateUrl: './historial-clinico-paciente.component.html',
  styleUrls: ['./historial-clinico-paciente.component.css']
})
export class HistorialClinicoPacienteComponent implements OnInit {

  entradas!             : string;
  page!                 : number;
  textoFiltro!          : string;
  dataHospitalizaciones : Hospitalizacion[] = [];
  tipoInputs!           : TipoInputs;
  filtroSeleccionado!   : string;
  inputSeleccionado!    : OpcionesInput;
  tipoFiltros!          : TipoFiltros[];
  
  constructor(private hs: HosipitalizacionService, private router: Router,  private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.page = 0;
    this.entradas = "5";
    this.filtroSeleccionado = "";    
    this.hs.allHospitalizaciones.subscribe(hospitalizaciones => this.dataHospitalizaciones = hospitalizaciones );
    this.tipoFiltros = [
      {
        valor: 'fechaIngreso',
        texto: 'Fecha Ingreso'
      }
    ];
    this.tipoInputs = {
      ''              : { tipo: 'text', placeholder: 'Buscar...', disable: true }, 
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
  
  //Este método reseta las paginas si ingreso algo en el campo de búsqueda
  resetearPaginas(){ this.page = 0; }

  paginaSiguiente(){ this.page += parseInt(this.entradas); }

  paginaAnterior(){ 
    if(this.page > 0) this.page -= parseInt(this.entradas); 
    if(this.page < parseInt(this.entradas)) this.page = 0;
  }

  seleccionarFiltro(): void{
    this.textoFiltro = '';
    this.inputSeleccionado = this.tipoInputs[this.filtroSeleccionado];
  }

  abrirDetallesHospitaliacion(hospitalizacion: Hospitalizacion): MatDialogRef<DetalleHospitalizacionComponent>{
    return this.matDialog.open(DetalleHospitalizacionComponent, {
      width: '1600px',
      height: '600px',
      data: hospitalizacion
    });
  }

  eliminarDetallesHospitalizacion():MatDialogRef<ModalEliminarHistorialComponent>{
    return this.matDialog.open(ModalEliminarHistorialComponent, {
      width: '600px',
    });
  }
}
