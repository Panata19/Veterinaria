import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { InventarioRoutingModule } from '../modules/inventario/inventario-routing.module';
import { MaterialModule } from '../modules/material/material.module';
import { TitleCardComponent } from './cards/title-card/title-card.component';
import { MenuComponent } from './components/menu/menu.component';
import { BotonCerrarModalComponent } from './buttons/boton-cerrar-modal/boton-cerrar-modal.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
    TitleCardComponent,
    MenuComponent,
    BotonCerrarModalComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
    TitleCardComponent,
    BotonCerrarModalComponent
  ],
})

export class SharedModule { }
