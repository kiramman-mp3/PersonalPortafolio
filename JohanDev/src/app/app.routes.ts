import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'contacto',
    component: ContactComponent
  }
];
