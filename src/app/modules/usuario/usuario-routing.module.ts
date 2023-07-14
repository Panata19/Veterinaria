import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListadoUsuariosComponent } from './usuario/pages/listado-usuarios/listado-usuarios.component';

const routes:Routes =[
    {
        path: '',
        component: ListadoUsuariosComponent,
        children: [
            {
                path: 'listado',
                component: ListadoUsuariosComponent
            },
            {
                path: '**',
                redirectTo: 'listado'
            }
        ]
    }
]
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class UsuarioRoutingModule { }