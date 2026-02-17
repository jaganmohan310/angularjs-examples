import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InPatient } from './components/in-patient/in-patient';
import { Registration } from './components/registration/registration';

const routes: Routes = [
    { path: '', component: InPatient },
    { path: 'list', component: InPatient },
    { path: 'in-patient-list', component: InPatient },
    { path: 'ip-admission', component: InPatient },
    { path: 'ip-advance-payment', component: InPatient },
    { path: 'ip-transfer-doctor', component: InPatient },
    { path: 'ip-transfer-bed', component: InPatient },
    { path: 'ip-discharge-summary', component: InPatient },
    { path: 'ip-bill-details', component: InPatient },
    { path: 'ip-settlement-bill', component: InPatient },
    { path: 'ip-test-results', component: InPatient },
    { path: 'ip-medical-certificate', component: InPatient },
    { path: 'ip-due-collection', component: InPatient },
    { path: 'ip-discharge-cancellation', component: InPatient },
    { path: 'admission', component: Registration },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        InPatient,
        Registration
    ]
})
export class PatientModule { }
