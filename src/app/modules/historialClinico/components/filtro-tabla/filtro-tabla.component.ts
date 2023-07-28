import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hospitalizacion } from 'src/app/modules/hospitalizacion/interfaces/hospitalizacion.interface';
import { OpcionesInput } from 'src/app/modules/hospitalizacion/interfaces/opcionesInput.interface';
import { TipoFiltros } from 'src/app/modules/hospitalizacion/interfaces/tipoFiltros.interface';
import { TipoInputs } from 'src/app/modules/hospitalizacion/interfaces/tipoInputs';

@Component({
  selector: 'app-filtro-tabla',
  templateUrl: './filtro-tabla.component.html',
  styleUrls: ['./filtro-tabla.component.css']
})
export class FiltroTablaComponent implements OnInit {

  page!                 : number;
  textoFiltro!          : string;
  dataHospitalizaciones : Hospitalizacion[] = [];
  tipoInputs!           : TipoInputs;
  filtroSeleccionado!   : string;
  inputSeleccionado!    : OpcionesInput;
  tipoFiltros!          : TipoFiltros[];
  entradas!             : string;

  @Output() obtenerEntrada     = new EventEmitter<string>();
  @Output() obtenerFiltro      = new EventEmitter<OpcionesInput>();
  @Output() obtenerTextoFiltro = new EventEmitter<string>();
  @Output() resetearPagina     = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.page = 0;
    this.entradas = "5";
    this.filtroSeleccionado = "";        
    this.tipoFiltros = [
      { valor: 'nombrePaciente', texto: 'Nombre Paciente' }, 
      { valor: 'fechaNac', texto: 'Fecha Nacimiento' },
      { valor: 'fechaIngreso', texto: 'Fecha Ingreso' }
    ];
    this.tipoInputs = {
      ''              : { tipo: 'text', placeholder: 'Buscar...', disable: true }, 
      'nombrePaciente': { tipo: 'text', placeholder: 'Buscar Paciente', disable: false},
      'fechaNac'      : { tipo: 'date', nombre: 'fechaNac', disable: false },
      'fechaIngreso'  : { tipo: 'date', nombre: 'fechaIngreso', disable: false },
      'todos'         : { tipo: '', placeholder: '', disable: true}
    };

    this.inputSeleccionado = this.tipoInputs[''];
  }

  seleccionarFiltro(): void{
    this.inputSeleccionado = this.tipoInputs[this.filtroSeleccionado];
    this.textoFiltro = ''
    this.obtenerTextoFiltro.emit(this.textoFiltro);
    this.obtenerFiltro.emit(this.inputSeleccionado);
  }

  //Este método obtiene el texto que se va a filtrar y lo pasamos por un output para mandar el valor al componente tabla
  getTextoFiltro(){
    this.resetearPagina.emit(0);
    this.obtenerTextoFiltro.emit(this.textoFiltro);
  }

  obtenerEntradas(){
    this.obtenerEntrada.emit(this.entradas);
  }

}
