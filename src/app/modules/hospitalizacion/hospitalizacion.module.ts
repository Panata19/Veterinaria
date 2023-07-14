import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './components/table/table.component';
import { MainPageHospitalizacionComponent } from './pages/main-page-hospitalizacion/main-page-hospitalizacion.component';
import { BotonNuevaHospitalizacionComponent } from './components/botones/boton-nueva-hospitalizacion/boton-nueva-hospitalizacion.component';
import { RegistroHospitalizacionComponent } from './components/modals/registro-hospitalizacion/registro-hospitalizacion.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { HospitalizacionRoutingModule } from './hospitalizacion-routing.module';
import { DetalleHospitalizacionComponent } from './components/modals/detalle-hospitalizacion/detalle-hospitalizacion.component';

@NgModule({
  declarations: [
    MainPageHospitalizacionComponent,
    TableComponent,
    BotonNuevaHospitalizacionComponent,
    RegistroHospitalizacionComponent,
    InputSearchComponent,
    DetalleHospitalizacionComponent,
  ],
  
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HospitalizacionRoutingModule,
    ReactiveFormsModule,
  ],

})

export class HospitalizacionModule { }
