import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CorporateItem {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-corporate-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './corporate-about.component.html',
  styleUrl: './corporate-about.component.scss',
})
export class CorporateAboutComponent {
  items: CorporateItem[] = [
    {
      title: 'Código Limpio',
      icon: 'fas fa-code',
      description: 'Escribo código estructurado, optimizado y fácil de mantener, aplicando siempre buenas prácticas y estándares modernos.',
    },
    {
      title: 'Resolución de Problemas',
      icon: 'fas fa-brain',
      description: 'Me apasiona desglosar desafíos lógicos complejos y transformarlos en soluciones técnicas eficientes y escalables.',
    },
    {
      title: 'Compromiso y Entrega',
      icon: 'fas fa-check-circle',
      description: 'Priorizo la comunicación transparente, el feedback constante y el cumplimiento riguroso de los plazos establecidos.',
    }
  ];
}
