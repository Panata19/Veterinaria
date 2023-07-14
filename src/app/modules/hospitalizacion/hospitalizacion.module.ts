import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageHospitalizacionComponent } from './pages/main-page-hospitalizacion/main-page-hospitalizacion.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from './components/table/table.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BotonNuevaHospitalizacionComponent } from './components/botones/boton-nueva-hospitalizacion/boton-nueva-hospitalizacion.component';
import { RegistroHospitalizacionComponent } from './components/modals/registro-hospitalizacion/registro-hospitalizacion.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { HospitalizacionRoutingModule } from './hospitalizacion-routing.module';

@NgModule({
  declarations: [
    MainPageHospitalizacionComponent,
    TableComponent,
    BotonNuevaHospitalizacionComponent,
    RegistroHospitalizacionComponent,
    InputSearchComponent,
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
    ReactiveFormsModule
  ],

})

export class HospitalizacionModule { }
