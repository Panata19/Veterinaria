import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { AddSuministrosModalComponent } from './components/add-suministros-modal/add-suministros-modal.component';
import { EditSuministrosModalComponent } from './components/edit-suministros-modal/edit-suministros-modal.component';

import { SuministrosRoutingModule } from './suministros-routing.module';

import { MatProgressBarModule} from '@angular/material/progress-bar'; 
import { SuministroPaginatorIntl } from './components/suministros-paginator-intl/suministro-paginator-intl';
import { SuministrosComponent } from './pages/main/suministros.component';



@NgModule({
  declarations: [
    AddSuministrosModalComponent,
    EditSuministrosModalComponent,
    SuministrosComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    SuministrosRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: SuministroPaginatorIntl }
  ]
})
export class SuministrosModule { }
