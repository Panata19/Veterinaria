import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuministrosComponent } from './pages/main/suministros.component';


const routes: Routes = [
  {
    path: '',
    component: SuministrosComponent
  },
  {
    path: '**', redirectTo: ''
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SuministrosRoutingModule { }
