import { HomeComponent } from './modules/home/home.component';
import { AppAuthGuard } from './app.authguard';

export const AppRoutes = [
    {
        path: 'dashboard',
        component:   HomeComponent
    },  
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];