import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ContactComponent } from './components/contact/contact.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'servicios',
    component: ServiciosComponent
  }
];
