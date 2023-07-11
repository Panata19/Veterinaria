import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { InicioPageComponent } from './shared/inicio-page/inicio-page.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioPageComponent,
    HomeComponent,
   
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
   
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
