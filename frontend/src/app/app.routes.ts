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
            { path: 'cancellation', component: Dashboard }, // Placeholder
            { path: 'patients', component: Dashboard }, // Placeholder
            { path: 'procedure', component: Dashboard }, // Placeholder
            { path: 'billing', component: Dashboard }, // Placeholder
            { path: 'discharge', component: Dashboard }, // Placeholder
        ]
    }
];

