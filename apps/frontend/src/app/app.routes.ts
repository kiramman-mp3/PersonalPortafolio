import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ContactComponent } from './components/contact/contact.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { ProyectoDetalleComponent } from './pages/proyecto-detalle/proyecto-detalle.component';
import { AdminComponent } from './pages/admin/admin.component';

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
  },
  {
    path: 'proyectos',
    component: ProyectosComponent
  },
  {
    path: 'proyectos/:id',
    component: ProyectoDetalleComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];
