import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { HistorialClinicoRoutingModule } from './historial-clinico-routing.module';
import { MainPageHistorialClinicoComponent } from './pages/main-page-historial-clinico/main-page-historial-clinico.component';
import { HospitalizacionRoutingModule } from '../hospitalizacion/hospitalizacion-routing.module';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { HistorialClinicoPacienteComponent } from './pages/historial-clinico-paciente/historial-clinico-paciente.component';
import { SharedModule } from '../../shared/shared.module';
import { FiltroHistorialClinicoPipe } from './pipes/filtro-historial-clinico.pipe';
import { TableDesktopComponent } from './components/tables/table-desktop/table-desktop.component';
import { TableMobileComponent } from './components/tables/table-mobile/table-mobile.component';
import { FiltroTablaComponent } from './components/filtro-tabla/filtro-tabla.component';
import { ModalEliminarHistorialComponent } from './components/modals/modal-eliminar/modal-eliminar.component';

@NgModule({
  declarations: [  
    MainPageHistorialClinicoComponent, 
    InputSearchComponent, 
    HistorialClinicoPacienteComponent, 
    FiltroHistorialClinicoPipe,
    TableDesktopComponent,
    TableMobileComponent,
    FiltroTablaComponent,
    ModalEliminarHistorialComponent
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
