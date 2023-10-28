import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MainPageHospitalizacionComponent } from './pages/main-page-hospitalizacion/main-page-hospitalizacion.component';
import { BotonNuevaHospitalizacionComponent } from './components/botones/boton-nueva-hospitalizacion/boton-nueva-hospitalizacion.component';
import { RegistroHospitalizacionComponent } from './components/modals/registro-hospitalizacion/registro-hospitalizacion.component';
import { InputSearchComponent } from './components/inputs/input-search/input-search.component';
import { HospitalizacionRoutingModule } from './hospitalizacion-routing.module';
import { DetalleHospitalizacionComponent } from './components/modals/detalle-hospitalizacion/detalle-hospitalizacion.component';
import { FiltroHospitalizacionPipe } from './pipes/filtro-hospitalizacion.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableDesktopComponent } from './components/table/table-desktop/table-desktop.component';
import { TableMobileComponent } from './components/table/table-mobile/table-mobile.component';
import { FiltrotablaComponent } from './components/filtrotabla/filtrotabla.component';
import { ModalEliminarhospitalizacionComponent } from './components/modals/modal-eliminar/modal-eliminar.component';


@NgModule({
  declarations: [
    MainPageHospitalizacionComponent,
    BotonNuevaHospitalizacionComponent,
    RegistroHospitalizacionComponent,
    InputSearchComponent,
    DetalleHospitalizacionComponent,
    FiltroHospitalizacionPipe,
    TableDesktopComponent,
    TableMobileComponent,
    FiltrotablaComponent,
    ModalEliminarhospitalizacionComponent
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
    FormsModule,
    SharedModule
  ],

})

export class HospitalizacionModule { }
