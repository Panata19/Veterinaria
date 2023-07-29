import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes:Routes =[
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '**',
                redirectTo: 'login',
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
export class AuthRoutingModule { }
