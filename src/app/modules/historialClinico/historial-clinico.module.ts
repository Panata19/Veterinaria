import { NgModule } from '@angular/core';
import { MainPageHistorialClinicoComponent } from './pages/main-page-historial-clinico/main-page-historial-clinico.component';
import { HistorialClinicoRoutingModule } from './historial-clinico-routing.module';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HospitalizacionRoutingModule } from '../hospitalizacion/hospitalizacion-routing.module';
import { TableComponent } from './components/table/table.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { HistorialClinicoPacienteComponent } from './pages/historial-clinico-paciente/historial-clinico-paciente.component';
import { SharedModule } from '../../shared/shared.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FormsModule } from '@angular/forms';
import { FiltroHistorialClinicoPipe } from './pipes/filtro-historial-clinico.pipe';



@NgModule({
  declarations: [  
    MainPageHistorialClinicoComponent, 
    TableComponent, 
    InputSearchComponent, 
    HistorialClinicoPacienteComponent, 
    FiltroPipe, FiltroHistorialClinicoPipe
  ],
  
  imports: [ 
    HistorialClinicoRoutingModule,
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HospitalizacionRoutingModule,
    FormsModule,
    SharedModule
  ],



})

export class HistorialClinicoModule { }
