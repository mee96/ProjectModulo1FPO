import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['tienda']);

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login').then(m => m.LoginComponent),
        ...canActivate(redirectLoggedInToHome)
    },
    {
        path: 'tienda',
        loadComponent: () => import('./components/tienda/tienda').then(m => m.TiendaComponent),
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'carrito',
        loadComponent: () => import('./components/carrito/carrito').then(m => m.CarritoComponent),
        ...canActivate(redirectUnauthorizedToLogin)
    },
    {
        path: 'proveedores',  
        loadComponent: () => import('./components/proveedores/proveedores').then(m => m.ProveedoresComponent),
        ...canActivate(redirectUnauthorizedToLogin)
    }
];