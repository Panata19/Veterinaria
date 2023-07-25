import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from '../modules/material/material.module';
import { TitleCardComponent } from './cards/title-card/title-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-delete-modal.component';

import { PacienteRoutingModule } from '../modules/paciente/paciente-routing.module';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
    TitleCardComponent,
    MenuComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PacienteRoutingModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
    TitleCardComponent,
    ConfirmationModalComponent
  ],
})
export class SharedModule { }
