import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './shared/components/layout/layout';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '',
        component: Layout,
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: 'patient',
                loadChildren: () => import('./features/patient/patient.module').then(m => m.PatientModule)
            },
            {
                path: 'doctor',
                loadChildren: () => import('./features/doctor/doctor.module').then(m => m.DoctorModule)
            },
            {
                path: 'billing',
                loadChildren: () => import('./features/billing/billing.module').then(m => m.BillingModule)
            },
            {
                path: 'batch',
                loadChildren: () => import('./features/batch/batch.module').then(m => m.BatchModule)
            },
            {
                path: 'diagnostic',
                loadChildren: () => import('./features/diagnostic/diagnostic.module').then(m => m.DiagnosticModule)
            },
            {
                path: 'app',
                loadChildren: () => import('./features/app-mgmt/app-mgmt.module').then(m => m.AppMgmtModule)
            },
            {
                path: 'ws',
                loadChildren: () => import('./features/ws/ws.module').then(m => m.WebSocketModule)
            },
            {
                path: 'oas',
                loadChildren: () => import('./features/oas/oas.module').then(m => m.OpenApiModule)
            },

            // Compatibility redirects
            { path: 'admission', redirectTo: 'patient/admission' },
            { path: 'registration', redirectTo: 'patient/admission' },
            { path: 'in-patient-list', redirectTo: 'patient/list' },
            { path: 'ip-admission', redirectTo: 'patient/admission' },
            { path: 'acc-transactions', redirectTo: 'billing/accounting' },
            { path: 'reports', redirectTo: 'batch/reports' },
            { path: 'rad-charges', redirectTo: 'diagnostic/radiology' },
            { path: 'lab-registration', redirectTo: 'diagnostic/laboratory' },
            { path: 'appointments', redirectTo: 'doctor/appointments' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
