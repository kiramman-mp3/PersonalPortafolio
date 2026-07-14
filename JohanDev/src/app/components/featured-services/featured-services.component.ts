import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesService, ServiceItem } from '../../shared/services/services.service';

@Component({
  selector: 'app-featured-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-services.component.html',
  styleUrl: './featured-services.component.scss'
})
export class FeaturedServicesComponent implements OnInit {
  featuredServices: ServiceItem[] = [];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.getServices().subscribe(services => {
      this.featuredServices = services;
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

