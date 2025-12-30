import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'calendar', 
    loadComponent: () => import('./components/calendar/calendar.component').then(m => m.CalendarComponent)
  },
  { 
    path: 'appointments', 
    loadComponent: () => import('./components/appointments/appointments.component').then(m => m.AppointmentsComponent)
  },
  { 
    path: 'patients', 
    loadComponent: () => import('./components/patients/patients.component').then(m => m.PatientsComponent)
  },
  { 
    path: 'providers', 
    loadComponent: () => import('./components/providers/providers.component').then(m => m.ProvidersComponent)
  },
  { path: '**', redirectTo: '/dashboard' }
];
