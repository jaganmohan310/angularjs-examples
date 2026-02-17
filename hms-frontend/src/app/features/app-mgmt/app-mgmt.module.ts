import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AppManagement } from './components/app-management';

const routes: Routes = [
    { path: '', component: AppManagement },
    { path: 'procedures', component: AppManagement },
    { path: 'service', component: AppManagement },
    { path: 'procedure-charges', component: AppManagement },
    { path: 'referral-doctor', component: AppManagement },
    { path: 'user-screen-settings', component: AppManagement },
    { path: 'service-charge', component: AppManagement },
    { path: 'user-report-settings', component: AppManagement },
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        AppManagement
    ]
})
export class AppMgmtModule { }
