import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Reports } from './components/reports/reports';

const routes: Routes = [
    { path: 'reports', component: Reports },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        Reports
    ]
})
export class BatchModule { }
