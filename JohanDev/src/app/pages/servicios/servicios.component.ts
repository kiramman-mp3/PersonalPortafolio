import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesService, ServiceItem } from '../../shared/services/services.service';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-servicios-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.scss'
})
export class ServiciosComponent implements OnInit {
  services: ServiceItem[] = [];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  getServiceIcon(id: string): string {
    const icons: { [key: string]: string } = {
      'web-dev': 'fa-code',
      'ui-ux': 'fa-palette',
      'ai-solutions': 'fa-brain'
    };
    return icons[id] || 'fa-star';
  }
}
