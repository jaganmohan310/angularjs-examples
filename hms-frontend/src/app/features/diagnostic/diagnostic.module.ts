import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Radiology } from './components/radiology/radiology';
import { Laboratory } from './components/laboratory/laboratory';
import { SoftLab } from './components/soft-lab/soft-lab';

const routes: Routes = [
    { path: 'radiology', component: Radiology },
    { path: 'laboratory', component: Laboratory },
    { path: 'soft-lab', component: SoftLab },
    { path: 'rad-charges', component: Radiology },
    { path: 'rad-diagnostic-test', component: Radiology },
    { path: 'lab-charges', component: SoftLab },
    { path: 'lab-registration', component: SoftLab },
    { path: 'lab-due-collection', component: SoftLab },
    { path: 'lab-report-status', component: SoftLab },
    { path: 'lab-test-cancellation', component: SoftLab },
    { path: 'lab-test-details', component: SoftLab },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        Radiology,
        Laboratory,
        SoftLab
    ]
})
export class DiagnosticModule { }
