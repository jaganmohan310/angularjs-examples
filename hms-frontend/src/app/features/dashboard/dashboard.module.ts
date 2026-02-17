import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Dashboard } from './components/dashboard';

const routes: Routes = [
    { path: '', component: Dashboard },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        Dashboard
    ]
})
export class DashboardModule { }
