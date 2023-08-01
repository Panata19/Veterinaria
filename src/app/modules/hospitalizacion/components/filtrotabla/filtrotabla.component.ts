import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Hospitalizacion } from '../../interfaces/hospitalizacion.interface';
import { OpcionesInput } from '../../interfaces/opcionesInput.interface';
import { TipoFiltros } from '../../interfaces/tipoFiltros.interface';
import { TipoInputs } from '../../interfaces/tipoInputs';
import { TIPO_FILTROS_HOSPITALIZACION, TIPO_IMPUTS_HOSPITALIZACION } from 'src/app/shared/config/config';


@Component({
  selector: 'app-filtrotabla',
  templateUrl: './filtrotabla.component.html',
  styleUrls: ['./filtrotabla.component.css']
})
export class FiltrotablaComponent implements OnInit {
  page!                 : number;
  textoFiltro!          : string;
  dataHospitalizaciones : Hospitalizacion[] = [];
  TIPO_INPUTS!           : TipoInputs;
  filtroSeleccionado!   : string;
  inputSeleccionado!    : OpcionesInput;
  TIPOS_FILTROS!        : TipoFiltros[];
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
    this.TIPOS_FILTROS = TIPO_FILTROS_HOSPITALIZACION;
    this.TIPO_INPUTS = TIPO_IMPUTS_HOSPITALIZACION;

    this.inputSeleccionado = this.TIPO_INPUTS[''];
  }

  seleccionarFiltro(): void{
    this.inputSeleccionado = this.TIPO_INPUTS[this.filtroSeleccionado];
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
