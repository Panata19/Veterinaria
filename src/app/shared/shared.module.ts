import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    LogoutModalComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
