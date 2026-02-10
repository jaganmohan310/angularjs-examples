import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './components/layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Registration } from './pages/registration/registration';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: Login },
    {
        path: '',
        component: Layout,
        children: [
            { path: 'dashboard', component: Dashboard },
            { path: 'admission', component: Registration },
            { path: 'registration', component: Registration },
            { path: 'radiology', loadComponent: () => import('./pages/radiology/radiology').then(m => m.Radiology) },
            { path: 'laboratory', loadComponent: () => import('./pages/laboratory/laboratory').then(m => m.Laboratory) },
            { path: 'appointments', loadComponent: () => import('./pages/appointments/appointments').then(m => m.Appointments) },

            // App Management Routes
            { path: 'procedures', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'service', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'procedure-charges', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'referral-doctor', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'user-screen-settings', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'service-charge', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },
            { path: 'user-report-settings', loadComponent: () => import('./pages/app-management/app-management').then(m => m.AppManagement) },

            // Reports Module
            { path: 'reports', loadComponent: () => import('./pages/reports/reports').then(m => m.Reports) },

            // Radiology Routes
            { path: 'rad-charges', loadComponent: () => import('./pages/radiology/radiology').then(m => m.Radiology) },
            { path: 'rad-diagnostic-test', loadComponent: () => import('./pages/radiology/radiology').then(m => m.Radiology) },

            // Lab Routes
            { path: 'lab-charges', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },
            { path: 'lab-registration', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },
            { path: 'lab-due-collection', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },
            { path: 'lab-report-status', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },
            { path: 'lab-test-cancellation', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },
            { path: 'lab-test-details', loadComponent: () => import('./pages/soft-lab/soft-lab').then(m => m.SoftLab) },

            // In Patient Routes
            { path: 'in-patient-list', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-admission', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-advance-payment', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-transfer-doctor', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-transfer-bed', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-discharge-summary', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-bill-details', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-settlement-bill', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-test-results', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-medical-certificate', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-due-collection', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'ip-discharge-cancellation', loadComponent: () => import('./pages/in-patient/in-patient').then(m => m.InPatient) },
            { path: 'acc-transactions', loadComponent: () => import('./pages/accounting/accounting').then(m => m.Accounting) },


            { path: 'cancellation', component: Dashboard }, // Placeholder
            { path: 'patients', component: Dashboard }, // Placeholder
            { path: 'procedure', component: Dashboard }, // Placeholder
            { path: 'billing', component: Dashboard }, // Placeholder
            { path: 'discharge', component: Dashboard }, // Placeholder
        ]
    }
];

