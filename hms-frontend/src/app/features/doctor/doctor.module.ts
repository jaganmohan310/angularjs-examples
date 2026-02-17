import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Appointments } from './components/appointments/appointments';

const routes: Routes = [
    { path: 'appointments', component: Appointments },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        Appointments
    ]
})
export class DoctorModule { }
